import { Routes, Route } from 'react-router-dom';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import AcademicWork from './sections/AcademicWork';
import Journal from './sections/Journal';
import TraumaVsPurpose from './articles/TraumaVsPurpose';
import Art from './pages/Art';
import ArtSection from './sections/ArtSection';
import BioWatch from './articles/BioWatch';
import Lactate from './articles/Lactate';
import OpenClaw from './articles/OpenClaw';
import ScienceIsEnteringItsAgenticEra from './articles/ScienceIsEnteringItsAgenticEra';
import AIForScienceIsBecomingInfrastructure from './articles/AIForScienceIsBecomingInfrastructure';
import SEO from './components/SEO';
import NotFound from './pages/NotFound';

const Home = () => (
  <main>
    <SEO
      title="Vivien Perrelle | Product Designer & AI Entrepreneur"
      description="Product designer and startup founder building verification infrastructure for AI-assisted science."
      url="/"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Vivien Perrelle",
        "url": "https://vivienperrelle.com",
        "jobTitle": "Product Designer & AI Entrepreneur",
        "description": "Product designer and startup founder building verification infrastructure for AI-assisted science.",
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
    <ArtSection />
  </main>
);

function App() {
  return (
    <div className="min-h-screen bg-cream selection:bg-accent selection:text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/trauma-vs-purpose" element={<TraumaVsPurpose />} />
        <Route path="/blog/biowatch" element={<BioWatch />} />
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
