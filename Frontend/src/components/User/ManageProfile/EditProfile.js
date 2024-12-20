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
  const { user, editProfile, fetchUserDetails } = useContext(userContext);

  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await fetchUserDetails();
        if (user) {
          setName(user.name);
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
      await editProfile(name, imageFile);
      await fetchUserDetails();
      
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  const handleProfilePictureClick = () => {
    const fileInput = document.getElementById("profile-picture-input");
    fileInput.click();
  };

  const handleProfilePictureChange = (e) => {
    setImageFile(e.target.files[0]);
    user.profilePictureUrl = URL.createObjectURL(e.target.files[0]);
  };

  return (
    <Container>
      <Heading>Edit Profile</Heading>
      {user && (
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <SaveButton onClick={handleSave}>Save Changes</SaveButton>
        </ContentWrapper>
      )}
    </Container>
  );
}

export default EditProfile;
