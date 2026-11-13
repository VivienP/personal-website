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
      title="Vivien Perrelle | AI Engineer & Founder"
      description="AI engineer and founder with a background in biosensors and lab automation. Currently at Station F in Paris with the Pioneers program."
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
