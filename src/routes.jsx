import { createElement, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { routeDefinitions } from './routeManifest';

const toLazyRoute = (definition) => {
    const Component = lazy(definition.load);
    return { path: definition.path, element: <Component /> };
};

export const routes = routeDefinitions.map(toLazyRoute);

export const legacyRedirects = [
    { path: '/blog/designing-protein-experiments-for-epistasis', to: '/journal/designing-protein-experiments-for-epistasis' },
    { path: '/blog/trauma-vs-purpose', to: '/journal/trauma-vs-purpose' },
    { path: '/blog/smartwatch', to: '/journal/smartwatch' },
    { path: '/blog/glucose-biosensor', to: '/journal/glucose-biosensor' },
    { path: '/blog/is-technology-neutral', to: '/journal/is-technology-neutral' },
    { path: '/blog/lactate', to: '/journal/lactate' },
    { path: '/blog/openclaw', to: '/journal/openclaw' },
    { path: '/blog/science-is-entering-its-agentic-era', to: '/journal/science-is-entering-its-agentic-era' },
    { path: '/blog/ai-for-science-is-becoming-a-systems-problem', to: '/journal/ai-for-science-is-becoming-a-systems-problem' },
    { path: '/blog/regulators-dont-accept-vibes', to: '/journal/regulators-dont-accept-vibes' },
    { path: '/blog/pharma-data-layer', to: '/journal/regulators-dont-accept-vibes' },
    { path: '/blog/biowatch', to: '/projects/biowatch' },
    { path: '/blog/green-grown', to: '/projects/green-grown' },
    { path: '/blog/bione', to: '/projects/bione' },
    { path: '/blog/motion-suit', to: '/projects/motion-suit' },
];

const notFoundDefinition = routeDefinitions.find(({ path }) => path === '/404');
const LazyNotFound = lazy(notFoundDefinition.load);

export const notFoundElement = <LazyNotFound />;
export const prerenderRoutes = routeDefinitions.map(({ path }) => path);

export const loadPrerenderRoute = async (url) => {
    const definition = routeDefinitions.find(({ path }) => path === url) ?? notFoundDefinition;
    const module = await definition.load();
    return { path: definition.path, element: createElement(module.default) };
};

export const renderLegacyRedirect = ({ path, to }) => (
    <Navigate key={path} to={to} replace />
);
