import React from "react";
import styled from "styled-components";
import ProjectHeroImage from "../../media/Projects/ProjectHeroImage";
import { ReactTyped } from "react-typed";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 90vh;
      padding: 3rem;

  }
`;

const IntroSection = styled.div`
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;

  @media (min-width: 768px) {
    align-items: start;
    width: 50%;
    text-align: left;
    padding: 2rem;
  }
`;

const ImageSection = styled.div`
  padding: 1rem;
  text-align: center;
  width: 50%;
  display: block;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubHeading = styled.h2`
  font-size: 2.5vh;
  margin-bottom: 2rem;
  font-weight : 600;

  @media (max-width: 768px) {
    font-size: 2vh;
  }
`;

const Description = styled.p`
  font-size: 2.5vh;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2vh;
  }
`;

function ProjectHero() {
  return (
    <Container className="container">
      <IntroSection>
        <Heading>Projects</Heading>
        <SubHeading>
          Designed and Developed with &hearts; by Priyanshu Chaurasiya
        </SubHeading>
        <Description>
          Here are a few of my latest projects, built to showcase creativity,
          innovation, and problem-solving.
        </Description>
        <div style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}>
          {" "}
          {/* Added margin-bottom */}
          <ReactTyped
            strings={[
              "Portfolio",
              "Link Vink",
              "The Vidyapeeth Library",
              "Text Studio",
              "News Swift",
            ]}
            typeSpeed={75}
            backSpeed={50}
            loop
          />
        </div>
      </IntroSection>
      <ImageSection>
        <ProjectHeroImage />
      </ImageSection>
    </Container>
  );
}

export default ProjectHero;
