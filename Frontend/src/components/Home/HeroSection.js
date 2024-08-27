import React from "react";
import heroimage from "../../media/HeroImage/Priyanshu.png";
import { ReactTyped } from "react-typed";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;
  align-items: center;
  padding-top: 15vh;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 3rem; 
    padding-top: 0;
  }
`;

const IntroSection = styled.div`
  width: 100%;
  text-align: center;
  padding: 1rem; 

  @media (min-width: 768px) {
    width: 60%;
    text-align: left;
    padding: 2rem;
  }
`;

const ImageSection = styled.div`
  width: 100%;
  text-align: center;
  padding: 1rem;  

  @media (min-width: 768px) {
    width: 40%;
    text-align: right;
  }
`;

const Priyanshuname = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;  

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SocialContainer = styled.div`
  display: flex;
  gap: 1.5rem;  // Adjusted gap for better spacing
  margin-top: 1.5rem;  // Corrected margin-top

  @media (max-width: 768px) {
    justify-content: center;
    gap: 2rem;  // Increased gap for better spacing on small screens
  }
`;

function HeroSection() {
  return (
    <Container>
      <IntroSection>
        <p style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Hi, I am...</p> {/* Added margin-bottom */}
        <Priyanshuname>Priyanshu Chaurasiya</Priyanshuname>
        <div style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}> {/* Added margin-bottom */}
          <ReactTyped
            strings={["Full Stack Developer", "Blogger", "UI/UX Designer"]}
            typeSpeed={75}
            backSpeed={50}
            loop
          />
        </div>
        <SocialContainer>
          <Link
            to="https://github.com/iamsainty"
            target="_blank"
            style={{ color: "black", fontSize: "1.75rem" }}
          >
            <FaGithub />
          </Link>
          <Link
            to="https://www.linkedin.com/in/iamsainty"
            target="_blank"
            style={{ color: "black", fontSize: "1.75rem" }}
          >
            <FaLinkedin />
          </Link>
          <Link
            to="https://www.instagram.com/iam__sainty"
            target="_blank"
            style={{ color: "black", fontSize: "1.75rem" }}
          >
            <FaInstagram />
          </Link>
          <Link
            to="https://twitter.com/iam__sainty"
            target="_blank"
            style={{ color: "black", fontSize: "1.75rem" }}
          >
            <FaXTwitter />
          </Link>
        </SocialContainer>
      </IntroSection>
      <ImageSection>
        <img
          src={heroimage}
          alt="Priyanshu Chaurasiya"
          width={"100%"}
          height={"auto"}
          style={{ padding: "1rem" }}  // Added padding to image
        />
      </ImageSection>
    </Container>
  );
}

export default HeroSection;
