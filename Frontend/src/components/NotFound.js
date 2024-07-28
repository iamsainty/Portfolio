// NotFound.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 2rem;
`;

const NotFoundTitle = styled.h1`
  font-size: 6rem;
  margin-bottom: 1rem;
  color: #343a40;
`;

const NotFoundMessage = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #6c757d;
`;

const StyledButton = styled.div`
  padding: 0.5rem 1.5rem;
  font-size: 1.2rem;
`;

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundMessage>
        Oops! The page you're looking for doesn't exist. <br />
        But don't worry, you can find plenty of other things on our homepage.
      </NotFoundMessage>
      <StyledButton className='btn btn-outline-dark' onClick={goHome} >Go Home</StyledButton>
    </NotFoundContainer>
  );
};

export default NotFound;
