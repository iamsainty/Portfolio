import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import textstudiopreview from '../../media/Projects/textstudio-preview.png';
import newsswiftpreview from '../../media/Projects/newsswift-preview.png';
import portfoliopreview from '../../media/Projects/portfolio-preview.png'
import { Link } from 'react-router-dom';

const ProjectContainer = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const ProjectCard = styled.div`
  width: 90%;
  margin: 0 auto;
  background-color: #fff;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding-bottom: 10px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;


export default function Projects() {
  const projects = [
    {
      title: 'Personal Portfolio',
      preview: portfoliopreview,
      description: 'My Own personal portfolio',
    },
    {
      title: 'News Swift',
      preview: newsswiftpreview,
      description: 'Daily dose of fresh news',
    },
    {
      title: 'Text Studio',
      preview: textstudiopreview,
      description: 'Text analyzing and formatting web application',
    },
  ];

  return (
    <ProjectContainer>
      <h2 className="text-center my-5" style={{ fontSize: '5vh', fontWeight: 'bold', color:'#191919' }}>
        Projects
      </h2>

      <div className="container text-center my-5">
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={3}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
          ]}
        >
          {projects.map((project) => (
            <div className="col" key={project.title}>
              <ProjectCard style={{ background: 'white', border: 'black 0.25px solid' }}>
                <img src={project.preview} className="card-img-top" alt={`${project.title} Preview`} />
                <div className="card-body my-3" style={{ color: '#191919' }}>
                  <h2 style={{ fontSize: '2vh', fontWeight: 'bold' }}>{project.title}</h2>
                  <p className="card-text" style={{ margin: '0.5vh', fontSize: '1.75vh' }}>{project.description}</p>
                </div>
              </ProjectCard>
            </div>
          ))}
        </Slider>
      </div>
      <Link to='/projects' >
      <button type="button" className={'btn btn-outline-dark'} style={{ width: '100%', padding: '1vh', fontSize: '2vh' }}>View all Projects</button>
      </Link>
      <br /><br />
    </ProjectContainer>
  );
}
