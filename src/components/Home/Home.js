import React from 'react';
import Introduction from './Introduction';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Education from './Education';
import Certifications from './Certifications';
import Contact from './Contact';
import Footer from './Footer';

export default function Home() {

  return (
    <>
    <div className='container'>
      <Introduction/>
      <Skills/>
      <Projects/>
      <Experience/>
      <Education/>
      <Certifications/>
      <Contact/>
    </div>
      <Footer/>
    </>
  );
}
