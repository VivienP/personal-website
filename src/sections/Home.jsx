import Hero from './Hero';
import Projects from './Projects';
import AcademicWork from './AcademicWork';
import Journal from './Journal';
import BeyondWork from './BeyondWork';
import Contact from './Contact';
import SEO from '../components/SEO';

const Home = () => (
  <main>
    <SEO
      title="Vivien Perrelle | Founder, AI for Science"
      description="Founder building verification infrastructure for biology research. Available for selective AI-for-Science freelance work — AI agents, RAG, scientific tooling."
      url="/"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Vivien Perrelle",
        "url": "https://vivienperrelle.com",
        "jobTitle": "Founder, AI for Science",
        "description": "Founder building verification infrastructure for biology research. Available for selective AI-for-Science freelance work — AI agents, RAG, scientific tooling.",
        "image": "https://vivienperrelle.com/me.png",
        "address": { "@type": "PostalAddress", "addressLocality": "Paris", "addressCountry": "FR" },
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
    <Contact />
  </main>
);

export default Home;
