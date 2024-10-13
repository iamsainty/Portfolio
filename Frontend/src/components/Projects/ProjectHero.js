import React from "react";
import styled from "styled-components";
import ProjectHeroImage from "../../media/Projects/ProjectHeroImage";
import { FiSearch } from "react-icons/fi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 60vh;
  justify-content: center;
  align-items: center;
  padding-top: 10vh;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    height: 75vh;
    padding: 3rem;
  }
`;

const IntroSection = styled.div`
  text-align: center;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

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
    font-size: 1.75rem;
  }
`;

const SubHeading = styled.p`
  font-size: 2.5vh;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2vh;
  }
`;

const SearchWrapper = styled.div`
  width: 350px;
  padding: 10px 15px;
  max-width: 100%;
  border: 2px solid black;
  border-radius: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const SearchInput = styled.input`
  font-size: 1rem;
  outline: none;
  border: none;
  flex: 1;
  margin-right: 10px;

  &::placeholder {
    color: #999;
  }
`;

const SearchIcon = styled(FiSearch)`
  font-size: 1.5rem; 
  color: black;
`;

function ProjectHero({ setSearchQuery }) {
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  return (
    <Container>
      <IntroSection>
        <Heading>Projects</Heading>
        <SubHeading>
          Designed and Developed with &hearts; by Priyanshu Chaurasiya
        </SubHeading>
        <SearchWrapper>
          <SearchInput
            type="text"
            onChange={handleSearch}
            placeholder="Search for a project"
          />
          <SearchIcon />
        </SearchWrapper>
      </IntroSection>
      <ImageSection>
        <ProjectHeroImage />
      </ImageSection>
    </Container>
  );
}

export default ProjectHero;
