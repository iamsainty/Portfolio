import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import userContext from "../../context/user/userContext";

const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 30px;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ddd;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

const UserDetail = styled.p`
  font-size: 18px;
  margin: 5px 0;
  color: #333;
`;

function MyProfile() {
  const { user, fetchUserDetails } = useContext(userContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await fetchUserDetails();
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchDetails();
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Heading>My Profile</Heading>
      {user && (
        <ProfileWrapper>
          <ProfileImage src={user.profilePictureUrl} alt="Profile" />
          <UserInfo>
          <UserDetail>
            <strong>Name:</strong> {user.name}
          </UserDetail>
          <UserDetail>
            <strong>Email:</strong> {user.email}
          </UserDetail>
          </UserInfo>
        </ProfileWrapper>
      )}
    </Container>
  );
}

export default MyProfile;
