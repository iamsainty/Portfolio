import React, { useState } from "react";
import SideNavigation from "./SideNavigation";
import MyProfile from "./MyProfile";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import NotificationSetting from "./NotificationSetting";
import AccountSetting from "./AccountSetting";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin-top: 50px;
  width: 80vw;
  height: 75vh;
  border: 1px solid #aaa;
  border-radius: 15px;
`;

const NavigationContainer = styled.div`
  width: 25%;
  height: 100%;
`;

const ContentContainer = styled.div`
  width: 75%;
  height: 100%;
`;

function ManageProfile() {
  const [activeSection, setActiveSection] = useState("My Profile");

  return (
    <Container className="container d-flex">
      <NavigationContainer>
        <SideNavigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </NavigationContainer>
      <ContentContainer>
        {activeSection === "My Profile" && <MyProfile />}
        {activeSection === "Edit Profile" && <EditProfile />}
        {activeSection === "Change Password" && <ChangePassword />}
        {activeSection === "Notification Setting" && <NotificationSetting />}
        {activeSection === "Account Setting" && <AccountSetting />}
      </ContentContainer>
    </Container>
  );
}

export default ManageProfile;