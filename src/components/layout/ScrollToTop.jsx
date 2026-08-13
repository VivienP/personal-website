import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll position on every route change.
 *
 * Covers '/', which never had a scroll reset of its own — navigating from a deep
 * article back to the homepage used to land mid-page. It is now the only place the
 * reset lives: the 27 per-page `useEffect(() => window.scrollTo(0, 0), [])` copies
 * ran after this one on every navigation and did nothing it had not already done.
 *
 * useEffect rather than useLayoutEffect: App renders through renderToString in Node
 * during prerendering, where useLayoutEffect warns and cannot run anyway.
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
