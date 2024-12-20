import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Heading = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
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
  font-size: 15px;
  font-weight: 600;
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
  const handleDeleteAccount = () => {
    console.log("Delete Account");
  };

  const handleLogOut = () => {
    console.log("Log Out");
  };

  return (
    <Container>
      <Heading>Account Settings</Heading>
      <ContentWrapper>
        <ActionSection>
          <ActionText>
            Delete your account permanently. This action cannot be undone.
          </ActionText>
          <ActionButton onClick={handleDeleteAccount}>Delete Account</ActionButton>
        </ActionSection>
        <ActionSection>
          <ActionText>Log out of your account, and come back later.</ActionText>
          <ActionButton onClick={handleLogOut}>Log Out</ActionButton>
        </ActionSection>
      </ContentWrapper>
    </Container>
  );
}

export default AccountSetting;
