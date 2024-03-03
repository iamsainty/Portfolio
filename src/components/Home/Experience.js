import React from 'react';
import styled from 'styled-components';
import iiclogo from '../../media/Logo/iic-logo.png';
import gdsclogo from '../../media/Logo/gdsc-logo.png';

const experiences = [
  {
    title: 'Social Media Coordinator',
    organization: 'IIC BBDITM',
    startDate: 'January 2023',
    endDate: 'Present',
    logoUrl: iiclogo,
  },
  {
    title: 'Competitive Programming Mentor',
    organization: 'GDSC BBDITM',
    startDate: 'August 2023',
    endDate: 'Present',
    logoUrl: gdsclogo,
  },
  // Add more experiences as needed
];

const ExperienceContainer = styled.div`
  text-align: left;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  padding: 20px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Logo = styled.img`
  height: 100px;
  width: 100px;
  margin-right: 20px;
  border-radius: 8px;
  object-fit: cover;
`;

const Experience = (props) => {
  return (
    <ExperienceContainer>
        <h2 className="text-center my-5" style={{fontSize: '5vh', fontWeight: 'bold',  color: props.mode==='dark'?'white':'#191919'}}>
          Experience
        </h2>
        {experiences.map((experience) => (
        <Card
        key={experience.title}
        style={{
          background: props.mode === 'dark' ? 'linear-gradient(125deg, #0E1213, #000000)' : 'linear-gradient(125deg, #F0F4F8, #FAFAFA)',
          borderColor: props.mode === 'dark' ? 'white' : 'black',
          border: '0.25px solid',
          color: props.mode==='dark'? 'white': '#191919'
        }}
      >
        <div style={{ display: 'flex' }}>
        <Logo src={experience.logoUrl} alt={`${experience.organization} logo`} style={{ height: '10vh', width: 'auto' }} />
          <div className='text-left'>
            <h2 style={{ fontSize: '2vh', fontWeight: 'bold' }}>{experience.title}</h2>
            <p style={{ margin: '0', fontSize: '1.75vh' }}>{experience.organization}</p>
            <p style={{ margin: '0', fontSize: '1.75vh' }}>{experience.startDate} - {experience.endDate}</p>
          </div>
        </div>
      </Card>
      
      ))}
    </ExperienceContainer>
  );
};

export default Experience;
