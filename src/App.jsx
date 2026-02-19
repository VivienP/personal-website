import { Routes, Route } from 'react-router-dom';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Journal from './sections/Journal';
import TraumaVsPurpose from './articles/TraumaVsPurpose';
import Art from './pages/Art';
import ArtSection from './sections/ArtSection';
import BioWatch from './articles/BioWatch';
import Lactate from './articles/Lactate';
import Dubai from './articles/Dubai';
import OpenClaw from './articles/OpenClaw';
import SEO from './components/SEO';
import NotFound from './pages/NotFound';

const Home = () => (
  <main>
    <SEO
      title="Vivien Perrelle | AI Product & Strategy"
      description="Product Designer and 2x startup founder exploring AI for Regulated Industries."
      url="/"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Vivien Perrelle",
        "url": "https://vivienperrelle.com",
        "jobTitle": "Product Designer & AI Entrepreneur",
        "description": "Product Designer and 2x startup founder exploring AI for Regulated Industries.",
        "image": "https://vivienperrelle.com/me.png",
        "sameAs": [
          "https://x.com/PerrelleVivien",
          "https://www.linkedin.com/in/vivien-perrelle/"
        ]
      }}
    />
    <Hero />
    <Projects />
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
        <Route path="/blog/dubai" element={<Dubai />} />
        <Route path="/blog/openclaw" element={<OpenClaw />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
