import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import userContext from "../../context/user/userContext";
import Loading from "../../Loading";
import { BsPencilFill } from "react-icons/bs";

const Container = styled.div`
  padding: 20px;
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
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 30px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #444;
  border-radius: 50%;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  height: 180px;
  width: 180px;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.25);
  }
`;

const EditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 125px;
  left: 145px;
  border: 2px solid #444;
  border-radius: 15px;
  background-color: #fff;
  color: #444;
  height: 30px;
  width: 30px;
  transition: width 0.5s ease, opacity 0.3s ease;
  overflow: hidden;
  cursor: pointer;
  font-size: 14px;

  svg {
    position: absolute;
    left: 6px;
  }

  span {
    opacity: 0;
    margin-left: 10px;
    white-space: nowrap;
    transition: opacity 0.3s ease;
  }

  &:hover {
    width: 150px;
    border-radius: 15px;
    justify-content: space-around;
    padding: 0 10px;

    span {
      opacity: 1;
    }
  }
`;

const ProfileImage = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px 20px;
  border: 1px solid #bbb;
  border-radius: 25px;
  outline: none;
  text-align: center;
  font-weight: 500;
  width: 40%;

  &:focus {
    border: 1px solid #000;
  }
`;

const DispalyText = styled.div`
  font-size: 15px;
  font-weight: 500;
  width: auto;
  transition: all 0.5s ease;

  MsgBox {
    width: auto;
  }
  SaveButton {
    width: auto;
  }
`;

const MsgBox = styled.div`
  padding: 10px 20px;
  background-color: #444;
  color: #fff;
  border: 1px solid #444;
  border-radius: 25px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: #444;
    border: 1px solid #444;
  }
`;

const SaveButton = styled.div`
  padding: 10px 20px;
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

  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        await fetchUserDetails();
        if (user) {
          setName(user.name);
          if (user.profilePictureUrl === null) {
            user.profilePictureUrl =
              "https://hey-sainty.s3.ap-south-1.amazonaws.com/profile-pictures/Default+Profile+Picture+-+Hey+Sainty.png";
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchDetails();
    // eslint-disable-next-line
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await editProfile(name, imageFile);
      await fetchUserDetails();
      setSaving(false);
      setMsg(response);
      setTimeout(() => {
        setMsg("");
      }, 3000);
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

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      <Headline>
        <span
          style={{
            fontFamily: "'Cedarville Cursive', cursive",
            fontSize: "40px",
            fontWeight: "bold",
            padding: "0 10px",
          }}
        >
          Customize
        </span>
        your profile
      </Headline>
      {user && (
        <ContentWrapper>
          <ProfileWrapper>
            <EditButton onClick={handleProfilePictureClick}>
              <BsPencilFill />
              <span>Choose a picture</span>
            </EditButton>
            <ProfileImage
              src={user.profilePictureUrl}
              alt="Profile Image"
              onClick={handleProfilePictureClick}
            />
          </ProfileWrapper>
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
          {saving ? (
            <div>
              <Loading />
            </div>
          ) : (
            <DispalyText>
              {msg ? (
                <MsgBox>{msg}</MsgBox>
              ) : (
                <SaveButton onClick={handleSave}>Save Changes</SaveButton>
              )}
            </DispalyText>
          )}
        </ContentWrapper>
      )}
    </Container>
  );
}

export default EditProfile;
