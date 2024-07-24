import React from 'react';
import styled from 'styled-components';
import kvnlogo from '../../media/Logo/kvn-logo.png';
import bbdlogo from '../../media/Logo/bbd-logo.png';

const education = [
  {
    title: 'Bachelor of Technology (Computer Science & Engineering)',
    institute: 'Babu Banarasi Institute of Technology and Management',
    year: '2021-Present',
    logoUrl: bbdlogo,
  },
  {
    title: 'Intermediate',
    institute: 'KVN Public School',
    year: '2020',
    logoUrl: kvnlogo,
  },
  {
    title: 'High School',
    institute: 'KVN Public School',
    year: '2018',
    logoUrl: kvnlogo,
  },
  // Add more experiences as needed
];

const EducationContainer = styled.div`
  text-align: left;
`;

const Card = styled.div`
  background-color: ${(props) => (props.mode === 'dark' ? '#000' : '#fff')};
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.mode === 'dark' ? '0 4px 8px rgba(255, 255, 255, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.2)'};
  margin-bottom: 20px;
  padding: 20px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${(props) =>
      props.mode === 'dark' ? '0 4px 8px rgba(255, 255, 255, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.2)'};
  }
`;

const Logo = styled.img`
  height: 100px;
  width: 100px;
  margin-right: 20px;
  border-radius: 8px;
  object-fit: cover;
`;

const Education = () => {
  return (
    <EducationContainer>
  <h2 className="text-center my-5" style={{ fontSize: '5vh', fontWeight: 'bold',  color: '#191919'  }}>
          Education
        </h2>            
        <div className="align-item-center">
      {education.map((edu) => (
        <Card key={edu.title} style={{ color: '#191919', background: 'linear-gradient(125deg, #F0F4F8, #FAFAFA)', border: '0.25px solid black'}}>
          <div style={{ display: 'flex' }}>
            <div className="col-md-auto">
              <Logo src={edu.logoUrl} alt={`${edu.institute} logo`} style={{height: '10vh', width: 'auto'}}/>
            </div>
            <div className="col">
              <h2  style={{fontSize: '2vh', fontWeight: 'bold'}}>{edu.title}</h2>
              <p className="card-text" style={{margin:'0', fontSize: '1.75vh'}}>{edu.institute}</p>
              <p className="card-text" style={{margin:'0', fontSize: '1.75vh'}}>{edu.year}</p>
            </div>
          </div>
        </Card>
      ))}
      </div>
    </EducationContainer>
  );
};

export default Education;
