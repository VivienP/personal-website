import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import {
  routes,
  legacyRedirects,
  notFoundElement,
  renderLegacyRedirect,
} from './routes';

function App({
  routeEntries = routes,
  redirectEntries = legacyRedirects,
  fallbackElement = notFoundElement,
}) {
  return (
    <div className="min-h-screen bg-cream selection:bg-accent selection:text-white">
      <Suspense fallback={null}>
        <Routes>
          {routeEntries.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          {redirectEntries.map(({ path, to }) => (
            <Route key={path} path={path} element={renderLegacyRedirect({ path, to })} />
          ))}
          <Route path="*" element={fallbackElement} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
