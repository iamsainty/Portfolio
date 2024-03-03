import React from 'react';
import Introduction from '../Introduction';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Education from './Education';
import Certifications from './Certifications';
import Contact from './Contact';

export default function Home(props) {
  let mode = props.mode;

  const professions = ['Developer', 'Designer', 'Programmer', 'Blogger'];

  return (
      <>
          <div className='container'>
              <Introduction mode={mode} heading={"Priyanshu Chaurasiya"} array={professions} />
              <Skills mode={mode} />
              <Projects mode={mode} />
              <Experience mode={mode} />
              <Education mode={mode} />
              <Certifications mode={mode} />
              <Contact mode={mode} />
          </div>
      </>
  );
}

