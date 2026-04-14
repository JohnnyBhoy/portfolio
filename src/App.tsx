import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Footer from './components/Footer';
import JohnnyBot from './components/JohnnyBot';

function App() {
  return (
    <div className="min-h-screen bg-ai-bg text-slate-200">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Footer />
      <JohnnyBot />
    </div>
  );
}

export default App;
