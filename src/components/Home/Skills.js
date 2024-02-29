import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Card as BootstrapCard, Row, Col } from 'react-bootstrap';

const professions = [
  {
    profession: 'Developer',
    skills: ['HTML 5', 'CSS 3', 'JavaScript', 'ReactJs', 'Node.js'],
  },
  {
    profession: 'Designer',
    skills: ['Canva', 'Figma', 'UI/UX Design', 'Prototyping'],
  },
  {
    profession: 'Programmer',
    skills: ['C++', 'Python', 'Java'],
  },
];

const SkillContainer = styled.div`
  text-align: left;
`;

const CustomCard = styled.div`
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

const Skills = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Find the maximum height among all cards
    const maxHeight = Math.max(...cardsRef.current.map((card) => card.clientHeight));

    // Apply the maximum height to all cards
    cardsRef.current.forEach((card) => {
      card.style.height = `${maxHeight}px`;
    });
  }, []);

  return (
    <SkillContainer>
      <div className="container mt-5">
        <h2 className="text-center my-5" style={{ fontSize: '5vh', fontWeight: 'bold' }}>
          Skills
        </h2>

        <Row>
          {professions.map((profession, index) => (
            <Col key={index} className={`my-3 mx-3`}>
              <CustomCard ref={(ref) => (cardsRef.current[index] = ref)}>
                <BootstrapCard.Body>
                  <h4 className="text-center">{profession.profession}</h4>
                  <ul className="list-group list-group-flush text-center">
                    {profession.skills.map((skill, index) => (
                      <li key={index} className="list-group-item">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </BootstrapCard.Body>
              </CustomCard>
            </Col>
          ))}
        </Row>
      </div>
    </SkillContainer>
  );
};

export default Skills;
