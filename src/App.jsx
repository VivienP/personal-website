import { Routes, Route, Navigate } from 'react-router-dom';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import AcademicWork from './sections/AcademicWork';
import Journal from './sections/Journal';
import TraumaVsPurpose from './articles/TraumaVsPurpose';
import Art from './pages/Art';
import BeyondWork from './sections/BeyondWork';
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
import SEO from './components/SEO';
import NotFound from './pages/NotFound';

const Home = () => (
  <main>
    <SEO
      title="Vivien Perrelle | Developer & Startup Founder"
      description="Developer and startup founder passionate about AI products and science. Currently building verification infrastructure for biology research."
      url="/"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Vivien Perrelle",
        "url": "https://vivienperrelle.com",
        "jobTitle": "Developer & Startup Founder",
        "description": "Developer and startup founder passionate about AI products and science. Currently building verification infrastructure for biology research.",
        "image": "https://vivienperrelle.com/me.png",
        "sameAs": [
          "https://x.com/PerrelleVivien",
          "https://www.linkedin.com/in/vivien-perrelle/"
        ]
      }}
    />
    <Hero />
    <Projects />
    <AcademicWork />
    <Journal />
    <BeyondWork />
  </main>
);

function App() {
  return (
    <div className="min-h-screen bg-cream selection:bg-accent selection:text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/trauma-vs-purpose" element={<TraumaVsPurpose />} />
        <Route path="/projects/biowatch" element={<BioWatch />} />
        <Route path="/projects/green-grown" element={<GreenGrown />} />
        <Route path="/projects/bione" element={<Bione />} />
        <Route path="/projects/motion-suit" element={<MotionSuit />} />
        <Route path="/projects/pkvitality" element={<PKvitality />} />
        {/* Legacy /blog/* project URLs → /projects/* (kept for SEO / old links) */}
        <Route path="/blog/biowatch" element={<Navigate to="/projects/biowatch" replace />} />
        <Route path="/blog/green-grown" element={<Navigate to="/projects/green-grown" replace />} />
        <Route path="/blog/bione" element={<Navigate to="/projects/bione" replace />} />
        <Route path="/blog/motion-suit" element={<Navigate to="/projects/motion-suit" replace />} />
        <Route path="/blog/smartwatch" element={<SmartWatch />} />
        <Route path="/blog/glucose-biosensor" element={<GlucoseBiosensor />} />
        <Route path="/blog/is-technology-neutral" element={<IsTechnologyNeutral />} />
        <Route path="/academic-work" element={<AcademicWorkPage />} />
        <Route path="/academic-work/smartwatch-embedded-biosensors" element={<SmartwatchBiosensorsThesis />} />
        <Route path="/academic-work/lactate-pharmacokinetics" element={<LactatePharmacokinetics />} />
        <Route path="/projects/oseille" element={<Oseille />} />
        <Route path="/projects/scientific-claim-verifier" element={<ScientificClaimVerifier />} />
        <Route path="/projects/finexov" element={<Finexov />} />
        <Route path="/blog/lactate" element={<Lactate />} />
        <Route path="/art" element={<Art />} />
        <Route path="/blog/openclaw" element={<OpenClaw />} />
        <Route path="/blog/science-is-entering-its-agentic-era" element={<ScienceIsEnteringItsAgenticEra />} />
        <Route path="/blog/ai-for-science-is-becoming-a-systems-problem" element={<AIForScienceIsBecomingInfrastructure />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
