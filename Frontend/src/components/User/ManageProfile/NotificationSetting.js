import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import userContext from "../../context/user/userContext";

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

const NotificationItem = styled.div`
display : flex;
flex-direction: column;
justify-content : space-between;
width : 40%;
gap : 20px;
`;

const NotificationHead = styled.div`
font-size: 20px;
font-weight: bolder;
margin-bottom : 20px;
`;

const Switch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
  width: 100%;
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
  const [emailNewsletter, setEmailNewsletter] = useState(true);
  const [emailsecurityAlerts, setEmailsecurityAlerts] = useState(true);

  const {user, fetchUserDetails, updateNotificationSettings} = useContext(userContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await fetchUserDetails();
        if(user){
          setEmailNewsletter(user.notifications.emailNewsletter);
          setEmailsecurityAlerts(user.notifications.emailSecurityAlert);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchDetails();
    // eslint-disable-next-line
  }, []);

  const handleSave = async () => {
    try {
      await updateNotificationSettings(emailNewsletter, emailsecurityAlerts);
    } catch (error) {
      console.error("Error updating notification settings:", error);
    }
  };

  return (
    <Container>
      <Heading>Notification Setting</Heading>
      <ContentWrapper>
        <NotificationItem>
          <NotificationHead>Email Notifications</NotificationHead>
          <Switch>
            <label>Newsletter</label>
            <SwitchContainer
              onClick={() => setEmailNewsletter(!emailNewsletter)}
              checked={emailNewsletter}
            >
              <SwitchButton checked={emailNewsletter} />
            </SwitchContainer>
          </Switch>
          <Switch>
            <label>Security Alerts</label>
            <SwitchContainer
              onClick={() => setEmailsecurityAlerts(!emailsecurityAlerts)}
              checked={emailsecurityAlerts}
            >
              <SwitchButton checked={emailsecurityAlerts} />
            </SwitchContainer>
          </Switch>
        </NotificationItem>
        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
      </ContentWrapper>
    </Container>
  );
}

export default NotificationSetting;
