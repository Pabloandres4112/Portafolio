import React, { useState, useEffect, useRef } from 'react';

import SkillsSection from './componetesPortafoleo/SkillsSectionNew';
import Whasapp from './componetesPortafoleo/Whasapp';
import Navbar from './componetesPortafoleo/Navbar';
import Hero from './componetesPortafoleo/Hero';
import About from './componetesPortafoleo/About';
import Projects from './componetesPortafoleo/Projects';
import Contact from './componetesPortafoleo/Contact';
import Footer from './componetesPortafoleo/Footer';
// import SistemaSolar from './Avatar3D';

type SectionId = 'home' | 'about' | 'skills' | 'projects' | 'contact';

const Portfolio = () => {
  const sectionRefs: Record<SectionId, React.MutableRefObject<HTMLElement | null>> = {
    home: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    contact: useRef(null),
  };

  const [activeSection, setActiveSection] = useState<SectionId>('home');

  const handleNavigate = (id: SectionId) => {
    const section = sectionRefs[id].current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      Object.entries(sectionRefs).forEach(([id, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(id as SectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 text-gray-900 dark:text-white transition-colors duration-500">
      <Whasapp />
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      <section ref={sectionRefs.home}>
        <Hero onNavigate={handleNavigate} />
      </section>

      <section ref={sectionRefs.about}>
        <About />
      </section>

      <section ref={sectionRefs.skills}>
        <SkillsSection />
      </section>

      <section ref={sectionRefs.projects}>
        <Projects />
      </section>

      <section ref={sectionRefs.contact}>
        <Contact />
      </section>

      {/* <section className="mt-8">
        <SistemaSolar/>
       </section> */}

      <Footer />
    </div>
  );
};

export default Portfolio;
