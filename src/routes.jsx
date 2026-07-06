// Single source of truth for the site's routes.
//
// Consumed by:
//   - App.jsx        → renders one <Route> per entry (client + hydration)
//   - prerender.jsx  → knows every URL to emit as static HTML at build time
//
// When you add an article/page, add ONE entry here and it is automatically
// routed AND pre-rendered. Keep `element` and `path` in sync with nothing else.

import { Navigate } from 'react-router-dom';

import Home from './sections/Home';
import TraumaVsPurpose from './articles/TraumaVsPurpose';
import Art from './pages/Art';
import BioWatch from './articles/BioWatch';
import Bione from './articles/Bione';
import MotionSuit from './articles/MotionSuit';
import SmartWatch from './articles/SmartWatch';
import GlucoseBiosensor from './articles/GlucoseBiosensor';
import IsTechnologyNeutral from './articles/IsTechnologyNeutral';
import AcademicWorkPage from './pages/AcademicWork';
import SmartwatchBiosensorsThesis from './articles/academic/SmartwatchBiosensorsThesis';
import LactatePharmacokinetics from './articles/academic/LactatePharmacokinetics';
import Oseille from './articles/projects/Oseille';
import ScientificClaimVerifier from './articles/projects/ScientificClaimVerifier';
import PKvitality from './articles/projects/PKvitality';
import Finexov from './articles/projects/Finexov';
import GreenGrown from './articles/GreenGrown';
import Lactate from './articles/Lactate';
import OpenClaw from './articles/OpenClaw';
import ScienceIsEnteringItsAgenticEra from './articles/ScienceIsEnteringItsAgenticEra';
import AIForScienceIsBecomingInfrastructure from './articles/AIForScienceIsBecomingInfrastructure';
import RegulatorsDontAcceptVibes from './articles/RegulatorsDontAcceptVibes';
import FreelanceAIEngineer from './pages/FreelanceAIEngineer';
import NotFound from './pages/NotFound';

// Content routes that render a real page. Every one of these is pre-rendered.
export const routes = [
  { path: '/', element: <Home /> },
  { path: '/blog/trauma-vs-purpose', element: <TraumaVsPurpose /> },
  { path: '/projects/biowatch', element: <BioWatch /> },
  { path: '/projects/green-grown', element: <GreenGrown /> },
  { path: '/projects/bione', element: <Bione /> },
  { path: '/projects/motion-suit', element: <MotionSuit /> },
  { path: '/projects/pkvitality', element: <PKvitality /> },
  { path: '/blog/smartwatch', element: <SmartWatch /> },
  { path: '/blog/glucose-biosensor', element: <GlucoseBiosensor /> },
  { path: '/blog/is-technology-neutral', element: <IsTechnologyNeutral /> },
  { path: '/academic-work', element: <AcademicWorkPage /> },
  { path: '/academic-work/smartwatch-embedded-biosensors', element: <SmartwatchBiosensorsThesis /> },
  { path: '/academic-work/lactate-pharmacokinetics', element: <LactatePharmacokinetics /> },
  { path: '/projects/oseille', element: <Oseille /> },
  { path: '/projects/scientific-claim-verifier', element: <ScientificClaimVerifier /> },
  { path: '/projects/finexov', element: <Finexov /> },
  { path: '/blog/lactate', element: <Lactate /> },
  { path: '/art', element: <Art /> },
  { path: '/blog/openclaw', element: <OpenClaw /> },
  { path: '/blog/science-is-entering-its-agentic-era', element: <ScienceIsEnteringItsAgenticEra /> },
  { path: '/blog/ai-for-science-is-becoming-a-systems-problem', element: <AIForScienceIsBecomingInfrastructure /> },
  { path: '/blog/regulators-dont-accept-vibes', element: <RegulatorsDontAcceptVibes /> },
  { path: '/freelance-ai-engineer-biology', element: <FreelanceAIEngineer /> },
  // Pre-rendered so the build emits a real 404 page; vite.config.js moves it
  // to dist/404.html, which Vercel serves with HTTP 404 for unmatched paths.
  { path: '/404', element: <NotFound /> },
];

// Legacy URLs → current ones (kept for SEO / old links).
// These 301 at the edge (vercel.json) for crawlers; the client-side <Navigate>
// covers in-app navigation. Not pre-rendered (they only redirect).
export const legacyRedirects = [
  { path: '/blog/pharma-data-layer', to: '/blog/regulators-dont-accept-vibes' },
  { path: '/blog/biowatch', to: '/projects/biowatch' },
  { path: '/blog/green-grown', to: '/projects/green-grown' },
  { path: '/blog/bione', to: '/projects/bione' },
  { path: '/blog/motion-suit', to: '/projects/motion-suit' },
];

// The catch-all 404 element (rendered for path="*").
export const notFoundElement = <NotFound />;

// Flat list of URLs to pre-render as static HTML. Derived from `routes` so it
// can never drift out of sync with what the app actually serves.
export const prerenderRoutes = routes.map((r) => r.path);

// Helper for App.jsx to render the redirect routes without repeating JSX.
export const renderLegacyRedirect = ({ path, to }) => (
  <Navigate key={path} to={to} replace />
);
