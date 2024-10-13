import React from "react";
import styled from "styled-components";

import textstudiopreview from "../../media/Projects/TextStudio.png";
import newsswiftpreview from "../../media/Projects/NewsSwift.png";
import heysaintypreview from "../../media/Projects/Portfolio.png";
import linkvinkpreview from "../../media/Projects/LinkVink.png";
import vidyapeethlibrarypreview from "../../media/Projects/TheVidyapeethLibrary.png";

import { FaEye } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { GoPencil } from "react-icons/go";

const projects = [
  {
    name: "Portfolio",
    description:
      "My Portfolio is my first full-stack web application, showcasing my skills, projects, and experiences. This project helped me consolidate my knowledge of the MERN stack while providing a platform for others to explore my work and connect with me.",
    preview: heysaintypreview,
    techs: ["React", "MongoDB", "Node.js", "Express.js", "Bootstrap"],
    github: "https://github.com/iamsainty/Portfolio",
    live: "https://hey-sainty.web.app/",
    blog: null,
    tags: [
      "portfolio",
      "hey sainty",
      "react",
      "MongoDB",
      "node js",
      "express js",
      "mern",
      "full stack",
    ],
  },
  {
    name: "Link Vink",
    description:
    "I developed Link Vink to create a unified platform for users to share multiple links easily. This project addresses the common issue of managing numerous social media profiles and allows users to consolidate them into a single, shareable link.",
    preview: linkvinkpreview,
    techs: ["React", "MongoDB", "Node.js", "Express.js"],
    github: "https://github.com/iamsainty/link-vink",
    live: "https://link-vink.vercel.app/",
    blog: "https://hey-sainty.web.app/blog/link-vink-project",
    tags: [
      "link vink",
      "mern stack",
      "full stack",
      "react",
      "mongo db",
      "express js",
      "node js",
      "vercel",
    ],
  },
  {
    name: "The Vidyapeeth Library",
    description:
    "The Vidyapeeth Library project was made to provide a digital presence for a local library. It showcases essential information about the library and its services, emphasizing the importance of community resources and promoting literacy in the area.",
    preview: vidyapeethlibrarypreview,
    techs: ["React"],
    github: "https://github.com/iamsainty/the-vidyapeeth-library",
    live: "https://the-vidyapeeth-library.web.app/",
    blog: null,
    tags: ["vidyapeeth library", "react", "firebase"],
  },
  {
    name: "Text Studio",
    description:
      "I created Text Studio as my first project when I started learning React. It serves as a simple text tool app that helps users count words and letters while providing case conversion features. This project allowed me to get hands-on experience with React's fundamentals.",
    preview: textstudiopreview,
    techs: ["React", "Bootstrap"],
    github: "https://github.com/iamsainty/TextStudio",
    live: "https://iamsainty.github.io/TextStudio/",
    blog: null,
    tags: ["text studio", "react", "bootstrap", "javascript", "github pages"],
  },
  {
    name: "News Swift",
    description:
      "I built News Swift while learning about API calls. This app fetches real-time news from various sources, helping users stay informed about current events. It was a great way for me to understand how to work with APIs and manage asynchronous data fetching.",
    preview: newsswiftpreview,
    techs: ["React", "Bootstrap"],
    github: "https://github.com/iamsainty/NewsSwift",
    live: "https://news-swift.web.app/",
    blog: null,
    tags: ["news swift", "react", "newsapi", "bootstrap", "firebase"],
  },
];

// Styled components for better layout
const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const Project = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  margin-bottom: 10vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProjectImage = styled.img`
  width: 50%;
  height: auto;

  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const ProjectDetails = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProjectName = styled.h2`
  font-size: 1.75rem;
  font-weight: bolder;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const TechList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const TechName = styled.p`
  font-size: 12.5px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 10px;
  margin: 5px;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
  text-align: center;
`;

const ProjectLinks = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem; // Increased gap for better spacing
`;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LinkText = styled.span`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #333;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const LinkIcon = styled.a`
  color: #000;
  font-size: 1.75rem; // Slightly larger for visibility
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

// Main DisplayProjects component with useEffect to listen for query changes
function DisplayProjects() {
  return (
    <ProjectsContainer className="container">
      {/* use map to map projects */}
      {projects.map((project, index) => (
        <Project key={index}>
          <ProjectImage src={project.preview} alt={`${project.name} preview`} />

          <ProjectDetails>
            <ProjectName>{project.name}</ProjectName>
            <ProjectDescription>{project.description}</ProjectDescription>

            <TechList>
              {project.techs.map((tech, i) => (
                <TechName
                  className="btn btn-outline-dark"
                  key={i}
                  data-tech={tech}
                >
                  {tech.charAt(0).toUpperCase() + tech.slice(1)}
                </TechName>
              ))}
            </TechList>

            <ProjectLinks>
              {project.github && (
                <LinkContainer>
                  <LinkIcon
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} GitHub Repo`}
                  >
                    <FaGithub />
                  </LinkIcon>
                  <LinkText>GitHub</LinkText>
                </LinkContainer>
              )}

              {project.live && (
                <LinkContainer>
                  <LinkIcon
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} Live Website`}
                  >
                    <FaEye />
                  </LinkIcon>
                  <LinkText>Live</LinkText>
                </LinkContainer>
              )}

              {project.blog && (
                <LinkContainer>
                  <LinkIcon
                    href={project.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} Blog`}
                  >
                    <GoPencil />
                  </LinkIcon>
                  <LinkText>Blog</LinkText>
                </LinkContainer>
              )}
            </ProjectLinks>
          </ProjectDetails>
        </Project>
      ))}
    </ProjectsContainer>
  );
}

export default DisplayProjects;
