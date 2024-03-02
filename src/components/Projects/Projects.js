// import React from 'react'
import styled from 'styled-components';
// import nopre from '../../media/no-preview-available.png'
import ProjectLanding from './ProjectLanding';
import githublogo from '../../media/github-logo.png'
import eyeimg from '../../media/eye.png'
import { Link } from 'react-router-dom';
import textstudiopre from '../../media/textstudio-preview.png'
import newshubpre from '../../media/newshub-preview.png'
import portfoliopre from '../../media/portfolio-preview.png'
import React, { useState } from 'react';
import { Input } from 'antd'; // Assuming you're using Ant Design for the Input component


const projects = [
  {
    preview: portfoliopre,
    title: "Portfolio",
    description: "My portfolio is a dynamic showcase of my skills and achievements, crafted using React. This platform details my professional journey, highlighting projects, experience, qualifications, certifications, and contact information. It serves as a comprehensive snapshot of my capabilities and accomplishments.",
    github: null,
    live: "/",
    tags: ['tag1', 'tag2']
  },
  {
    preview: newshubpre,
    title: "NewsHub",
    description: "NewsHub is a cutting-edge news website developed with React, seamlessly integrating real-time news from across the globe via the NEWSAPI. Users can explore news by category, including sports, health, business, science, and more. For in-depth coverage, the platform redirects users to official news channels, ensuring a rich and diverse news consumption experience.",
    github: "https://github.com/iamsainty/NewsHub",
    live: "/",
    tags: ['tag1', 'tag2']
  },
  {
    preview: textstudiopre,
    title: "TextStudio",
    description: "TextStudio is a versatile text analysis and formatting tool built using React. It empowers users to input text for analysis, providing insights into word count, letter frequency, and more. Additionally, users can easily format and edit text, with features such as changing case (uppercase/lowercase) and other formatting options, enhancing text manipulation capabilities.",
    github: "https://github.com/iamsainty/TextStudio",
    live: "https://iamsainty.github.io/TextStudio/",
    tags: ['tag1', 'tag2']
  },
]



const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 10vh;
  margin-bottom: 10vh;
  padding: 20px;
`;

const Logo = styled.img`
  height: 100px;
  width: 100px;
  margin-right: 20px;
  border-radius: 8px;
  object-fit: cover;
`;

export default function Projects(props) {
  let mode = props.mode;

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  


  return (
    <>
      <div className='container'>
        <ProjectLanding mode={mode} />
        <div style={{ height: '20vh', width: '100%' }}></div>
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={handleSearch}
          style={{
            marginBottom: '5vh',
            width: '100%',
            padding: '2vh',
            background: 'linear-gradien(#DEE4EA, #F9FCFF)',
            fontSize: '2vh',
            border: '1px solid #191919'
          }}
        />


        {projects.filter((project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase())).map((project) => (
            <Card
              key={project.title}
              style={{
                background: props.mode === 'dark' ? 'linear-gradient(125deg, #0E1213, #000000)' : 'linear-gradient(125deg, #F0F4F8, #FAFAFA)',
                borderColor: props.mode === 'dark' ? 'white' : 'black',
                border: '0.25px solid',
                color: props.mode === 'dark' ? 'white' : '#191919',
                maxWidth: '100%',
                padding: '2.5vh',
              }}
            >
              <div className="row g-0">
                <div className="col-md-auto">
                  <Logo src={project.preview} alt={`${project.organization} logo`} style={{ height: '25vh', width: 'auto' }} />
                </div>
                <div className='col-md-8 text-left' style={{ padding: '2vh' }}>
                  <h2 style={{ fontSize: '3.5vh', fontWeight: 'bold' }}>{project.title}</h2>
                  <p style={{ marginTop: '2vh', fontSize: '2vh' }}>{project.description}</p>
                </div>
              </div>
              <div className="container text-center" style={{ paddingTop: '3vh' }}>
                <div className="row align-items-center">
                  <div className="col my-2  d-flex justify-content-center align-items-center" style={{ border: '1px solid', borderColor: props.mode === 'dark' ? 'white' : 'black', marginLeft: '0.5vh', borderRadius: '1vh', padding: '0.5vh', paddingRight: '2vh' }}>
                    <Link to={project.live} style={{ textDecoration: 'none', color: props.mode === 'dark' ? 'white' : 'black' }}>
                      <img src={githublogo} alt="" style={{ height: '4vh' }} />
                      &nbsp; View on GitHub
                    </Link>
                  </div>
                  <div className="col-md-6 my-2 d-flex justify-content-center align-items-center" style={{ border: '1px solid', borderColor: props.mode === 'dark' ? 'white' : 'black', marginLeft: '0.5vh', borderRadius: '1vh', padding: '0.5vh' }}>
                    <Link to={project.live} style={{ textDecoration: 'none', color: props.mode === 'dark' ? 'white' : 'black' }}>
                      <img src={eyeimg} alt="" style={{ height: '4vh' }} />
                      &nbsp; View Live
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
      </div>
    </>
  );
}
