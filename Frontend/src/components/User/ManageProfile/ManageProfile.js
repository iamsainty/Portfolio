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
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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

// const Content = styled.div`
//   height: 100%;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-weight: 600;
//   min-height: 80vh;
//   text-align: center;
//   padding: 50px;
//   font-size: 18px;

//   @media (min-width: 768px) {
//     font-size: 24px;
//   }
// `;

function ManageProfile() {
  const [activeSection, setActiveSection] = useState("My Profile");
  const { user, fetchUserDetails } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        await fetchUserDetails();
        setLoading(false);
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

  if (!user) {
    navigate("/");
  }

  return (
    <>
      <Helmet>
        <title>Manage Profile - View, Edit, and Manage Account</title>
        <meta
          name="description"
          content="Manage your profile and settings on Hey Sainty."
        />
        <meta name="author" content="Priyanshu Chaurasiya" />
        <meta
          property="og:title"
          content="Manage Profile - Hey Sainty | Priyanshu Chaurasiya"
        />
        <meta
          property="og:description"
          content="Manage your profile and settings on Hey Sainty."
        />
        <meta
          property="og:image"
          content="https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png"
        />
        <meta property="og:url" content="https://hey-sainty.web.app/profile" />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content="Hey Sainty | Priyanshu Chaurasiya"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Manage Profile - Hey Sainty | Priyanshu Chaurasiya"
        />
        <meta
          name="twitter:description"
          content="Manage your profile and settings on Hey Sainty."
        />
        <meta
          name="twitter:image"
          content="https://hey-sainty.s3.ap-south-1.amazonaws.com/seo-media/Hey-Sainty-og-share-image.png"
        />
        <meta
          name="twitter:url"
          content="https://hey-sainty.web.app/profile"
        />
        <meta
          name="keywords"
          content="Manage Profile, Priyanshu Chaurasiya, Hey Sainty, web development, MERN stack, projects"
        />

        <link rel="canonical" href="/profile" />
      </Helmet>
      <Container className="container">
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
          {activeSection === "Notification Settings" && <NotificationSetting />}
          {activeSection === "Account Settings" && <AccountSetting />}
        </ContentContainer>
      </Container>
    </>
  );
}

export default ManageProfile;
