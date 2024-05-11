import styled from 'styled-components';
import githublogo from '../../media/Social icons/github-logo.png'
import { Link } from 'react-router-dom';
import textstudiopre from '../../media/Projects/textstudio-preview.png'
import newsswiftpre from '../../media/Projects/newsswift-preview.png'
import portfoliopre from '../../media/Projects/portfolio-preview.png'
import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import Introduction from '../Introduction';


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
    preview: newsswiftpre,
    title: "News Swift",
    description: "News Swift is a cutting-edge news website developed with React, seamlessly integrating real-time news from across the globe via the NEWSAPI. Users can explore news by category, including sports, health, business, science, and more. For in-depth coverage, the platform redirects users to official news channels, ensuring a rich and diverse news consumption experience.",
    github: "https://github.com/iamsainty/NewsSwift",
    live: "https://news-swift.web.app/",
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
  useEffect(() => {
      document.title = `${props.title}`;
    }, [props.title]);
  let mode = props.mode;

  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const myprojects = ['Text Studio', 'News Hub', 'Portfolio']



  return (
    <>
      <div className='container'>
        <Introduction heading={"Explore Projects"} mode={mode} array={myprojects} />
        <div style={{ height: '20vh', width: '100%' }}></div>
        <div className="d-flex align-items-center mb-5">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: '5px',
                        border: `1px solid ${props.mode === 'dark' ? 'white' : 'black'}`,
                        overflow: 'hidden',
                        backgroundColor: `${props.mode === 'dark' ? 'black' : 'white'}`,
                    }}>
                        <div style={{
                            backgroundColor: `${props.mode === 'dark' ? 'black' : 'white'}`,
                            color: `${props.mode === 'dark' ? 'white' : 'black'}`,
                            height: '100%',
                            minWidth: '7vh',
                            fontWeight: 'bold',
                            fontSize: '1.8vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0 1.5vh',
                            borderRight: `1px solid ${props.mode === 'dark' ? 'white' : 'black'}`,
                        }}>
                            Search
                        </div>
                        <Input
                            placeholder="Search project..."
                            value={searchQuery}
                            onChange={handleSearch}
                            style={{
                                flex: '1',
                                height: '100%',
                                padding: '2.5vh 1.5vh', // Adjusted padding for increased height
                                fontSize: '1.6vh',
                                borderRadius: '0',
                                border: 'none',
                                backgroundColor: `${props.mode === 'dark' ? 'black' : 'white'}`,
                                color: `${props.mode === 'dark' ? 'white' : 'black'}`,
                                outline: 'none',
                            }}
                        />
                    </div>
                </div>


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
                  <div className="col-md-6 my-2 d-flex justify-content-center align-items-center">
                    <Link to={project.github} style={{ width: '100%' }}>
                      <button type="button" className={`btn btn-outline-${props.mode === 'dark' ? 'light' : 'dark'}`} style={{ width: '100%' }}>
                        <img src={githublogo} alt="" style={{ height: '4vh' }} />&nbsp; {project.github === null ? "Can't show on GitHub (private)" : 'View on GitHub'}
                      </button>
                    </Link>
                  </div>
                  <div className="col-md-6 my-2 d-flex justify-content-center align-items-center">
                    <Link to={project.live} style={{ width: '100%' }}>
                      <button type="button" className={`btn btn-outline-${props.mode === 'dark' ? 'light' : 'dark'}`} style={{ width: '100%' }}>
                        &#128065;&nbsp; {project.live === null ? "Live not available" : 'View live'}
                      </button>
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
