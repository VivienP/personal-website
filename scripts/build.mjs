// Build entry used by `npm run build` instead of the `vite build` CLI.
//
// The prerender bundle (vite-prerender-plugin imports it into this process)
// pulls in the browser build of react-dom/server, whose scheduler opens a
// MessageChannel at module scope and never closes it. That port keeps the
// Node event loop alive after the build completes — locally the process
// hangs forever, and on Vercel the build is killed at the 45-minute limit.
//
// `build()` resolves only after every plugin hook (including closeBundle,
// where prerendering and the 404 move happen) has finished, so exiting here
// is safe and cannot truncate the output.
import { build } from 'vite';
import { assertSitemapCurrent } from './sitemap.mjs';

try {
    await assertSitemapCurrent();
    await build();
    process.exit(0);
} catch (err) {
    console.error(err);
    process.exit(1);
}
