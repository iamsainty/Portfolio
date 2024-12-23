import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 50px 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Headline = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: #444;

  span {
    font-size: 50px;
  }

  @media (max-width: 768px) {
    font-size: 16px;

    span {
      font-size: 35px;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 50px;
`;

const ActionSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
`;

const ActionText = styled.div`
  font-weight: 500;
  text-align: center;
`;

const ActionButton = styled.div`
  padding: 10px 20px;
  font-weight: 600;
  font-size: 15px;
  background-color: #444;
  color: #fff;
  border: 1px solid #444;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background-color: white;
    color: #444;
    border: 1px solid #444;
  }
`;

function AccountSetting() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("userToken");
    navigate("/");
    window.location.reload();
  };

  return (
    <Container>
      <ContentWrapper>
        <Headline>
          <span
            style={{
              fontFamily: "'Cedarville Cursive', cursive",
              fontWeight: "bold",
              padding: "0 10px",
            }}
          >
            Manage
          </span>
          your account
        </Headline>
        {/* <ActionSection>
          <ActionText>
            Delete your account permanently. This action cannot be undone.
          </ActionText>
          <ActionButton onClick={handleDeleteAccount}>Delete Account</ActionButton>
        </ActionSection> */}
        <ActionSection>
          <ActionText>
            Sign out of your account, you can sign in again later.
          </ActionText>
          <ActionButton onClick={handleSignOut}>Sign Out</ActionButton>
        </ActionSection>
      </ContentWrapper>
    </Container>
  );
}

export default AccountSetting;
