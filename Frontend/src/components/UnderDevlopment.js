import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DevContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  text-align: center;
  padding: 2rem;
`;

const DevTitle = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #343a40;
`;

const DevMessage = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #6c757d;
  max-width: 1000px;
`;

const StyledButton = styled.div`
  padding: 0.5rem 1.5rem;
  font-size: 1.2rem;
`;

function UnderDevlopment() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <DevContainer>
      <DevTitle>Oops! You're Early</DevTitle>
      <DevMessage>
        Thank you for exploring my app! This page is still under development,
        but I truly appreciate your enthusiasm. Feel free to check out the other
        sections of the app that are ready for you!
      </DevMessage>
      <StyledButton className="btn btn-outline-dark" onClick={goHome}>
        Go Home
      </StyledButton>
    </DevContainer>
  );
}

export default UnderDevlopment;
