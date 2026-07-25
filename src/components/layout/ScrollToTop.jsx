import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets scroll position on every route change.
 *
 * Central replacement for the per-article scroll effects as those articles migrate
 * to ArticleLayout. It already covers '/', which never had one — navigating from a
 * deep article back to the homepage used to land mid-page.
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
