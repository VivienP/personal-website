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
      title="Vivien Perrelle | Lab Automation & Scientific Software Engineer"
      description="Fixed-scope software engineering for lab automation teams: workflow implementation, instrument/software integration, reliability and testing. PyLabRobot contributor."
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
