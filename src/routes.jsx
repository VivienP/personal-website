import { createElement, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { routeDefinitions, legacyRedirects } from './routeManifest';

const toLazyRoute = (definition) => {
    const Component = lazy(definition.load);
    return { path: definition.path, element: <Component /> };
};

export const routes = routeDefinitions.map(toLazyRoute);

export { legacyRedirects };

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
