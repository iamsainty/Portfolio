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

const ProfilePicture = styled.img`
  width: 200px;
  height: 200px;
  border: 2.5px solid #999;
  padding: 2.5px;
  border-radius: 50%;
  object-fit: cover;
`;

const Input = styled.input`
  width: 50%;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 25px;
  outline: none;

  &:focus {
    border: 1px solid #000;
  }
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

  &:hover {
    background-color: white;
    color: #444;
    border: 1px solid #444;
  }
`;

function EditProfile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profilePictureUrl:
      "https://www.svgrepo.com/show/382097/female-avatar-girl-face-woman-user-9.svg",
  });

  const handleSave = () => {
    console.log("Save button clicked");
  };

  const handleProfilePictureClick = () => {
    const fileInput = document.getElementById("profile-picture-input");
    fileInput.click();
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setUser({ ...user, profilePictureUrl: URL.createObjectURL(file) });
  };

  return (
    <Container>
      <Heading>Edit Profile</Heading>
      <ContentWrapper>
        <ProfilePicture
          src={user.profilePictureUrl}
          alt="Profile Image"
          onClick={handleProfilePictureClick}
        />
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleProfilePictureChange}
          id="profile-picture-input"
        />
        <Input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
      </ContentWrapper>
    </Container>
  );
}

export default EditProfile;
