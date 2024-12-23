import React, { useContext, useEffect, useState } from "react";
import SideNavigation from "./SideNavigation";
import MyProfile from "./MyProfile";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import NotificationSetting from "./NotificationSetting";
import AccountSetting from "./AccountSetting";
import styled from "styled-components";
import userContext from "../../context/user/userContext";
import Loading from "../../Loading";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  width: 80vw;
  height: 75vh;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 90vw;
    height: 100vh;
  }
`;

const NavigationContainer = styled.div`
  width: 25%;
  height: 100%;
  border-radius: 20px 0 0 20px;
  border-right: none;

  @media (max-width: 768px) {
    width: 100%;
    height: 7.5vh;
    border: none;
    margin-top: 50px;
  }
`;

const ContentContainer = styled.div`
  width: 75%;
  height: 100%;
  border: 2px solid #444;
  border-radius: 0 20px 20px 0;
  border-left: none;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-top: 5vh;
    border-radius: 20px;
    border: 2px solid #444;
  }
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  min-height: 50vh;
  text-align: center;
  padding: 20px;
  font-size: 18px;

  @media (min-width: 768px) {
    font-size: 24px;
  }
`;

function ManageProfile() {
  const [activeSection, setActiveSection] = useState("My Profile");
  const { user, fetchUserDetails } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const [userSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        await fetchUserDetails();
        setLoading(false);
        if (user) {
          setUserSignedIn(true);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchDetails();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <Container className="container">
      <NavigationContainer>
        <SideNavigation
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </NavigationContainer>
      <ContentContainer>
        {!userSignedIn ? (
          <Content>Sign in / Sign Up to access your profile</Content>
        ) : (
          <>
            {activeSection === "My Profile" && <MyProfile />}
            {activeSection === "Edit Profile" && <EditProfile />}
            {activeSection === "Change Password" && <ChangePassword />}
            {activeSection === "Notification Settings" && (
              <NotificationSetting />
            )}
            {activeSection === "Account Settings" && <AccountSetting />}
          </>
        )}
      </ContentContainer>
    </Container>
  );
}

export default ManageProfile;
