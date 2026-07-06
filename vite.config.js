import { readdir, readFile, writeFile, rm, rename } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

// The pre-render entry (src/prerender.jsx) is registered as a Rollup input, so
// Vite emits its build-only SSR *JS* chunk (~500 KB, pulls in react-dom/server)
// plus a <link rel="modulepreload"> for it on every page. That JS is never
// executed at runtime, so preloading/shipping it is pure waste.
//
// IMPORTANT: only the prerender *.js* is disposable. The prerender entry also
// imports index.css, so Vite names the site's ONE real stylesheet
// prerender-*.css and links it via <link rel="stylesheet"> — that file and its
// link are load-bearing and MUST be kept, or the whole site loses its styling.
//
// So this plugin, in closeBundle (after the prerender plugin has consumed the
// chunk), strips ONLY the JS modulepreload hint and deletes ONLY the orphaned
// prerender *.js* chunk. It never touches CSS or stylesheet links.
const PRERENDER_JS_MODULEPRELOAD =
  /\s*<link\b[^>]*rel="modulepreload"[^>]*href="[^"]*\/prerender-[A-Za-z0-9_-]+\.js"[^>]*>/g

const stripPrerenderArtifacts = () => {
  // Absolute path to the build output dir, resolved from Vite's config so we
  // don't depend on process.cwd() (this file is linted as browser code).
  let outRoot = 'dist'
  return {
    name: 'strip-prerender-artifacts',
    apply: 'build',
    configResolved(config) {
      outRoot = join(config.root, config.build?.outDir || 'dist')
    },
    async closeBundle() {
      const root = outRoot
      const walk = async (dir) => {
        const entries = await readdir(dir, { withFileTypes: true })
        for (const entry of entries) {
          const full = join(dir, entry.name)
          if (entry.isDirectory()) {
            await walk(full)
          } else if (entry.name.endsWith('.html')) {
            const html = await readFile(full, 'utf8')
            const cleaned = html.replace(PRERENDER_JS_MODULEPRELOAD, '')
            if (cleaned !== html) await writeFile(full, cleaned)
          } else if (/^prerender-[A-Za-z0-9_-]+\.js$/.test(entry.name)) {
            // Orphaned build-only SSR JS, referenced by nothing once the
            // modulepreload above is stripped. CSS is deliberately excluded.
            await rm(full, { force: true })
          }
        }
      }
      await walk(root)

      // The /404 route pre-renders to 404/index.html; Vercel only serves a
      // custom not-found page (with HTTP status 404) from top-level 404.html.
      const nested404 = join(root, '404', 'index.html')
      if (existsSync(nested404)) {
        await rename(nested404, join(root, '404.html'))
        await rm(join(root, '404'), { recursive: true, force: true })
      } else {
        console.warn(
          '[strip-prerender-artifacts] dist/404/index.html not found — is the /404 route missing from src/routes.jsx? Unmatched URLs will not return a real 404.',
        )
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Pre-render each route to static HTML at build time so JS-less crawlers
    // (many AI agents, social scrapers) see full page content, not an empty
    // #root shell. Routes come from src/routes.jsx via src/prerender.jsx.
    vitePrerenderPlugin({
      renderTarget: '#root',
      prerenderScript: '/src/prerender.jsx',
    }),
    stripPrerenderArtifacts(),
  ],
})
