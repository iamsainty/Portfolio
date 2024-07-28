import React, { useEffect } from 'react';
import Introduction from '../Introduction';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Education from './Education';
import Certifications from './Certifications';
import Contact from './Contact';
import Blog from './Blog';

export default function Home(props) {

    useEffect(() => {
        document.title = `${props.title}`;
      }, [props.title]);

  const professions = ['Developer', 'Designer', 'Programmer', 'Blogger'];

  return (
      <>
          <div className='container'>
              <Introduction heading={"Priyanshu Chaurasiya"} array={professions} />
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

