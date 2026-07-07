import { readdir, readFile, writeFile, rm, rename } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { vitePrerenderPlugin } from 'vite-prerender-plugin'

// The pre-render entry (src/prerender.jsx) is registered as a Rollup input, so
// Vite emits its build-only SSR *JS* chunk (pulls in react-dom/server) plus a
// <link rel="modulepreload"> for it on every page. That JS is never executed
// in the browser, so preloading/shipping it is pure waste.
//
// IMPORTANT: only the prerender *.js* is disposable. The site's ONE real
// stylesheet (shared-*.css, from index.css via the manualChunks below) and its
// <link rel="stylesheet"> are load-bearing and MUST be kept, or the whole site
// loses its styling.
//
// So this plugin, in closeBundle (after the prerender plugin has consumed the
// chunk), strips ONLY the JS modulepreload hint and deletes ONLY the orphaned
// prerender *.js* chunk — after cutting the bare execution-order import Rollup
// leaves in the index entry chunk (`import "./prerender-*.js";`), and only
// when no client chunk has a NAMED import from it. It never touches CSS.
const PRERENDER_JS_MODULEPRELOAD =
  /\s*<link\b[^>]*rel="modulepreload"[^>]*href="[^"]*\/prerender-[A-Za-z0-9_-]+\.js"[^>]*>/g

// Rollup is free to host modules shared by the two entries (main.jsx and the
// prerender entry) INSIDE the prerender entry chunk — when it does, the client
// bundle statically imports prerender-*.js, and deleting that file below kills
// hydration on the whole site (every import in the graph aborts with a 404).
//
// So: any module reachable from BOTH entries goes into a dedicated "shared"
// chunk. Everything else keeps its default placement — main-only code stays in
// the index entry chunk (it may touch the DOM at module scope and must never
// run during prerendering, which executes its chunks in Node), and
// prerender-only code (react-dom/server) stays in the prerender entry chunk,
// which is then a leaf chunk nothing imports — safe to delete below.
const isEntrySuffix = (p) =>
  p.endsWith('/src/main.jsx') || p.endsWith('/src/prerender.jsx')

const manualChunks = (id, { getModuleInfo }) => {
  // CSS modules go through the same logic on purpose: index.css is imported by
  // both entries, and if its module stays hosted in the prerender chunk, Vite
  // keeps a side-effect `import "./prerender-*.js"` in the client bundle (CSS
  // ownership), recreating the exact edge this function exists to prevent.
  // Which entries transitively import this module?
  const seen = new Set([id])
  const stack = [id]
  let fromMain = false
  let fromPrerender = false
  while (stack.length) {
    const current = stack.pop()
    const p = current.replaceAll('\\', '/')
    if (p.endsWith('/src/main.jsx')) fromMain = true
    else if (p.endsWith('/src/prerender.jsx')) fromPrerender = true
    if (fromMain && fromPrerender) break
    for (const importer of getModuleInfo(current)?.importers ?? []) {
      if (!seen.has(importer)) {
        seen.add(importer)
        stack.push(importer)
      }
    }
  }
  if (fromMain && fromPrerender && !isEntrySuffix(id.replaceAll('\\', '/'))) {
    return 'shared'
  }
}

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
      const htmlFiles = []
      const jsFiles = []
      const prerenderJs = []
      const walk = async (dir) => {
        const entries = await readdir(dir, { withFileTypes: true })
        for (const entry of entries) {
          const full = join(dir, entry.name)
          if (entry.isDirectory()) {
            await walk(full)
          } else if (entry.name.endsWith('.html')) {
            htmlFiles.push(full)
          } else if (/^prerender-[A-Za-z0-9_-]+\.js$/.test(entry.name)) {
            prerenderJs.push({ name: entry.name, path: full })
          } else if (entry.name.endsWith('.js')) {
            jsFiles.push(full)
          }
        }
      }
      await walk(root)

      // Only delete a prerender chunk if no OTHER chunk imports it. If Rollup
      // ever hosts shared client code in the prerender chunk again (it has —
      // that shipped a homepage whose JS graph 404'd and never hydrated),
      // keep the file: a heavier working site beats a broken one.
      let keptAny = false
      for (const { name, path: chunkPath } of prerenderJs) {
        const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        // A NAMED (or dynamic) import means real client code lives in the
        // prerender chunk — deleting it would 404 the whole module graph and
        // kill hydration site-wide (this shipped once). Keep the file then:
        // a heavier working site beats a broken one.
        const realImport = new RegExp(
          `from\\s*"[^"]*${escaped}"|import\\(\\s*"[^"]*${escaped}"`,
        )
        // A BARE side-effect import is only Rollup's execution-order link to
        // the second entry; the chunk holds nothing the client uses, so the
        // import statement is safe to cut before deleting the chunk.
        const bareImport = new RegExp(`import\\s*"[^"]*${escaped}"\\s*;?`, 'g')

        let real = false
        for (const js of jsFiles) {
          if (realImport.test(await readFile(js, 'utf8'))) {
            real = true
            break
          }
        }
        if (real) {
          keptAny = true
          console.warn(
            `[strip-prerender-artifacts] NOT deleting ${name}: a client chunk has a named import from it. ` +
              'Shared client code leaked into the prerender chunk — check manualChunks in vite.config.js.',
          )
          continue
        }

        for (const js of jsFiles) {
          const code = await readFile(js, 'utf8')
          const cleaned = code.replace(bareImport, '')
          if (cleaned !== code) await writeFile(js, cleaned)
        }
        await rm(chunkPath, { force: true })
      }

      // Strip the modulepreload hints only when the chunks are actually gone.
      if (!keptAny) {
        for (const full of htmlFiles) {
          const html = await readFile(full, 'utf8')
          const cleaned = html.replace(PRERENDER_JS_MODULEPRELOAD, '')
          if (cleaned !== html) await writeFile(full, cleaned)
        }
      }

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
  build: {
    rollupOptions: {
      output: { manualChunks },
    },
  },
})
