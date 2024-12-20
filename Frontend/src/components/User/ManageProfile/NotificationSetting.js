import React, { useState } from "react";
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
  gap: 25px;
`;

const Switch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  width: 40%;
  gap: 10px;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  width: 45px;
  height: 20px;
  padding: 10px;
  border: 1px solid #555;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  background-color: ${({ checked }) => (checked ? "#555" : "white")};
  transition: all 0.5s ease;
`;

const SwitchButton = styled.div`
  height: 100%;
  width: 50%;
  border-radius: 15px;
  position: absolute;
  left: ${({ checked }) => (checked ? "50%" : "0")};
  background-color: ${({ checked }) => (checked ? "white" : "#555")};
  transition: all 0.5s ease;
`;

const SaveButton = styled.div`
  padding: 10px 20px;
  font-weight: 600;
  font-size: 15px;
  background-color: #444;
  color: #fff;
  border: 1px solid #444;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.5s ease;
  margin-top: 25px;

  &:hover {
    background-color: white;
    color: #444;
    border: 1px solid #444;
  }
`;

function NotificationSetting() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);

  const handleSave = () => {
    console.log("Save");
  };

  return (
    <Container>
      <Heading>Notification Setting</Heading>
      <ContentWrapper>
        <Switch>
          <label>Email Notifications</label>
          <SwitchContainer
            onClick={() => setEmailNotifications(!emailNotifications)}
            checked={emailNotifications}
          >
            <SwitchButton checked={emailNotifications} />
          </SwitchContainer>
        </Switch>
        <Switch>
          <label>Push Notifications</label>
          <SwitchContainer
            onClick={() => setPushNotifications(!pushNotifications)}
            checked={pushNotifications}
          >
            <SwitchButton checked={pushNotifications} />
          </SwitchContainer>
        </Switch>
        <Switch>
          <label>SMS Notifications</label>
          <SwitchContainer
            onClick={() => setSmsNotifications(!smsNotifications)}
            checked={smsNotifications}
          >
            <SwitchButton checked={smsNotifications} />
          </SwitchContainer>
        </Switch>

        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
      </ContentWrapper>
    </Container>
  );
}

export default NotificationSetting;
