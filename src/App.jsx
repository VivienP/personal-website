import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import {
  routes,
  legacyRedirects,
  notFoundElement,
  renderLegacyRedirect,
} from './routes';

function App() {
  return (
    <div className="min-h-screen bg-cream selection:bg-accent selection:text-white">
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {legacyRedirects.map(({ path, to }) => (
          <Route key={path} path={path} element={renderLegacyRedirect({ path, to })} />
        ))}
        <Route path="*" element={notFoundElement} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
