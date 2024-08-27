import React, { useEffect } from 'react';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Education from './Education';
import Certifications from './Certifications';
import Contact from './Contact';
import Blog from './Blog';
import HeroSection from './HeroSection';

export default function Home(props) {

    useEffect(() => {
        document.title = `${props.title}`;
      }, [props.title]);


  return (
      <>
          <div className='container'>
            <HeroSection />
              <Skills />
              <Projects />
              <Experience />
              <Education />
              <Certifications />
              <Blog />
              <Contact />
          </div>
      </>
  );
}

