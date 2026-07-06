import Hero from './Hero';
import Projects from './Projects';
import AcademicWork from './AcademicWork';
import Journal from './Journal';
import BeyondWork from './BeyondWork';
import Contact from './Contact';
import SEO from '../components/SEO';

const Home = () => (
  <main>
    {/* No jsonLd prop: the SEO component serves its Person/Service/WebSite
        @graph on '/' by default — one source of truth for the entity. */}
    <SEO
      title="Vivien Perrelle — AI Engineer & Founder, AI for Biology"
      description="I help techbio and AI-for-biology teams ship AI agents, RAG pipelines, and scientific tooling. Selective freelance engagements — book an intro call."
      url="/"
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
