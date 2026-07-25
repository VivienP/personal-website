import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll position on every route change.
 *
 * Covers '/', which never had a scroll reset of its own — navigating from a deep
 * article back to the homepage used to land mid-page. Article pages still carry
 * their own per-page effect; this one makes the behaviour uniform across routes.
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
