import Navigation from './components/Navigation';
import Cursor from './components/Cursor';
import Atmosphere from './components/Atmosphere';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import SpeakingBand from './components/SpeakingBand';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Atmosphere />
      <Cursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <SpeakingBand />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
