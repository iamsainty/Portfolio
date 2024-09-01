import React from "react";
import styled from "styled-components";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaBootstrap,
  FaNodeJs,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiMongodb,
  SiExpress,
  SiCanva,
  SiVisualstudiocode,
  SiFirebase,
  SiVercel,
  SiDocker,
  SiC,
  SiCplusplus,
   SiPython

} from "react-icons/si";
import { DiJava } from 'react-icons/di';  // Import Java icon from 'react-icons/di'

import { LuFigma } from "react-icons/lu";
import { Container, Row, Col } from "react-bootstrap";

// Skill data
const skills = [
  {
    name: "Frontend Development",
    techs: [
      { name: "HTML", icon: <FaHtml5 color="#E34F26" /> },
      { name: "CSS", icon: <FaCss3Alt color="#1572B6" /> },
      { name: "JavaScript", icon: <FaJs color="#F7DF1E" /> },
      { name: "React", icon: <FaReact color="#61DAFB" /> },
      { name: "Bootstrap", icon: <FaBootstrap color="#7952B3" /> },
    ],
  },
  {
    name: "Backend Development",
    techs: [
      { name: "Node.js", icon: <FaNodeJs color="#339933" /> },
      { name: "Express.js", icon: <SiExpress color="#000000" /> },
      { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
    ],
  },
  {
    name: "DevOps & Tools",
    techs: [
      { name: "Docker", icon: <SiDocker color="#2496ED" /> },
      { name: "Git", icon: <FaGitAlt color="#F05032" /> },
      { name: "VS Code", icon: <SiVisualstudiocode color="#007ACC" /> },
      { name: "Firebase", icon: <SiFirebase color="#FFCA28" /> },
      { name: "Vercel", icon: <SiVercel color="#000000" /> },
    ],
  },
  {
    name: "Design & UI",
    techs: [
      { name: "Canva", icon: <SiCanva color="#00C4CC" /> },
      { name: "Figma", icon: <LuFigma color="#F24E1E" /> },
    ],
  },
  {
    name: "Programming & Algorithms",
    techs: [
      { name: "C", icon: <SiC color="#00599C" /> },  // Adding C icon for consistency
      { name: "C++", icon: <SiCplusplus color="#004482" /> },  // Adding C++ icon for consistency
      { name: "Python", icon: <SiPython color="#306998" /> },  // Adding Python icon
      { name: "Java", icon: <DiJava color="red" /> },  // Adding Java icon
    ],
  }
  
];



// Styled components
const SkillsSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15vh;

  @media (max-width: 768px) {
    margin-top: 10vh;
  }
`;

const SkillHeading = styled.h3`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;

const SkillIconContainer = styled.div`
  border: 0.5px solid grey;
  padding: 5px 15px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const SkillMessage = styled.p`
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: #555;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Skills = () => {
  return (
    <SkillsSection>
      <Container>
        <Row className="my-4">
          <Col
            xs={12}
            lg={4}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <SkillHeading>Skills</SkillHeading>
            <SkillMessage>
              Transforming ideas into reality, from intuitive UIs to robust
              backends. Let's build something incredible together.
            </SkillMessage>
          </Col>
          <Col
            xs={12}
            lg={8}
            className="d-flex flex-column"
            style={{ height: "75vh", justifyContent: "space-between" }}
          >
            {skills.map((skill, index) => (
              <div key={index}>
                <h4
                  className="text-center"
                  style={{ fontWeight: "600", margin: "15px 0px" }}
                >
                  {skill.name}
                </h4>
                <div className="d-flex flex-wrap justify-content-center">
                  {skill.techs.map((tech, techIndex) => (
                    <SkillIconContainer key={techIndex}>
                      <span>{tech.icon}</span>
                      <span
                        className="d-none d-sm-block"
                        style={{ marginLeft: "7px" }}
                      >
                        {tech.name}
                      </span>
                    </SkillIconContainer>
                  ))}
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </SkillsSection>
  );
};

export default Skills;
