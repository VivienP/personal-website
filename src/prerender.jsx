// Build-time pre-render entry for vite-prerender-plugin.
//
// The plugin calls the exported `prerender({ url })` once per route and injects
// the returned `html` into the #root node of index.html, writing a real static
// .html file per URL. Crawlers that don't execute JS then see full content.
//
// We render the REAL <App/> inside <StaticRouter>, so every page's own <SEO>
// component (React 19 native metadata) emits its <title>/<meta>/<link> into the
// server-rendered output exactly as in the browser. No routing or SEO changes.
//
// React 19 hoists those metadata tags into the rendered string. We lift them out
// of the body and return them via `head` so the plugin places them in <head>
// (replacing the template's <title> and appending the rest). This keeps <SEO>
// as the single source of truth for per-route metadata and avoids duplicate
// tags between <head> and <body>.

import { renderToString } from 'react-dom/server';
// React Router v7 exports StaticRouter from the core package; react-router-dom
// no longer has a `/server` subpath.
import { StaticRouter } from 'react-router';
import App from './App.jsx';
import { loadPrerenderRoute, prerenderRoutes } from './routes';
import './index.css';

// Metadata tags React 19 hoists during SSR. We relocate these to <head>.
const HEAD_TAG = /<(title|meta|link)\b[^>]*?>(?:[\s\S]*?<\/\1>)?/gi;
const TITLE_TEXT = /<title\b[^>]*>([\s\S]*?)<\/title>/i;

// <title> is also a legitimate SVG child: it is the accessible name of an inline
// figure. Without masking, HEAD_TAG strips those out of the body — and an inline
// SVG rendered before <SEO> would silently become the page's document title.
// React itself does not hoist them (it tracks the SVG namespace); only this
// string-level pass needs to be told. Assumes no nested <svg>, which the flat
// icon and figure markup on this site satisfies.
const SVG_BLOCK = /<svg\b[\s\S]*?<\/svg>/gi;

const maskSvgSubtrees = (html) => {
  const blocks = [];
  const masked = html.replace(SVG_BLOCK, (block) => `<!--svg:${blocks.push(block) - 1}-->`);
  return [masked, (s) => s.replace(/<!--svg:(\d+)-->/g, (_, index) => blocks[Number(index)])];
};

// The extracted title text is already React-escaped, and vite-prerender-plugin
// escapes head.title again on injection — decode once or "&" ships as "&amp;amp;".
// Single-pass replace so "&amp;lt;" decodes to "&lt;", not all the way to "<".
const ENTITIES = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'" };
const decodeEntities = (s) => s.replace(/&(?:amp|lt|gt|quot|#39|#x27);/g, (m) => ENTITIES[m]);

export async function prerender({ url }) {
  const route = await loadPrerenderRoute(url);
  const rendered = renderToString(
    <StaticRouter location={url}>
      <App routeEntries={[route]} redirectEntries={[]} fallbackElement={route.element} />
    </StaticRouter>,
  );

  // Pull hoisted <title>/<meta>/<link> out of the body, ignoring SVG subtrees...
  const [body, restoreSvg] = maskSvgSubtrees(rendered);
  const headElements = body.match(HEAD_TAG) || [];
  const titleMatch = headElements.find((t) => /^<title/i.test(t));
  const title = titleMatch
    ? decodeEntities(titleMatch.replace(TITLE_TEXT, '$1').trim())
    : '';

  // ...and strip them from the HTML so they don't duplicate in <body>.
  const html = restoreSvg(body.replace(HEAD_TAG, ''));

  // Everything except <title> goes into <head> as raw strings; the plugin's
  // serializeElement passes strings through unchanged. <title> is handled
  // separately via head.title so it replaces the template's placeholder title.
  const elements = new Set(headElements.filter((t) => !/^<title/i.test(t)));

  return {
    html,
    head: { title, elements },
    // Returned from every page, but the plugin de-dupes; emitting the full set
    // from the first route (/) guarantees all pages are generated even if some
    // are not reachable via in-page <a> links the crawler would otherwise follow.
    links: new Set(prerenderRoutes),
  };
}
