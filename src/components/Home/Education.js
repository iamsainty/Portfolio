import React from 'react';
import styled from 'styled-components';
import kvnlogo from '../../media/kvn-logo.png';
import bbdlogo from '../../media/bbd-logo.png';

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

const Education = () => {
  return (
    <EducationContainer>
      <h2 className='text-center my-5' style={{ fontSize: '5vh', fontWeight: 'bold' }}>Education</h2>
      {education.map((edu) => (
        <Card key={edu.title}>
          <div style={{ display: 'flex' }}>
            <div className="col-md-auto my-3">
              <Logo src={edu.logoUrl} alt={`${edu.institute} logo`} style={{height: '10vh', width: 'auto'}}/>
            </div>
            <div className="col my-3">
              <h2  style={{fontSize: '2vh', fontWeight: 'bold'}}>{edu.title}</h2>
              <p className="card-text" style={{margin:'0.5vh', fontSize: '1.75vh'}}>{edu.institute}</p>
              <p className="card-text" style={{margin:'0.5vh', fontSize: '1.75vh'}}>{edu.year}</p>
            </div>
          </div>
        </Card>
      ))}
    </EducationContainer>
  );
};

export default Education;
