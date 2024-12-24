import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import userContext from "../../context/user/userContext";
import Loading from "../../Loading";

const Container = styled.div`
  padding: 50px 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 0 0 75px 0;
  @media (max-width: 768px) {
  padding: 0;
}
`;

const Greeting = styled.h1`
  font-size: 25px;
  font-weight: 500;
  color: #444;

  span {
    font-size: 50px;
  }

  @media (max-width: 768px) {
    font-size: 16px;

    span {
      font-size: 30px;
    }
  }
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #444;
  border-radius: 50%;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);
  padding: 2.5px;
`;

const ProfileImage = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
  }
`;

const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: #333;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  color: #444;
  gap: 10px;
  width : 100%;
  border: 1px solid #444;
  border-radius: 10px;
  padding-right: 10px;
  font-weight: 500;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 15px;
    text-align: center;
  }
`;

const FieldName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background-color: #444;
  color: #fff;
  border-radius: 5px;
  width: 75px;

  @media (max-width: 768px) {
    display: none;
  }
`;

function MyProfile() {
  const { user, fetchUserDetails } = useContext(userContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        await fetchUserDetails();
        if (user && user.profilePictureUrl === null) {
          user.profilePictureUrl =
            "https://hey-sainty.s3.ap-south-1.amazonaws.com/profile-pictures/Default+Profile+Picture+-+Hey+Sainty.png";
        }
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
          height: '100%',
          minHeight: "50vh",
          width: "100%",
        }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <Container>
      {user && (
        <ContentWrapper>
          <Greeting>
            Hey
            <span
              style={{
                fontFamily: "'Cedarville Cursive', cursive",
                fontWeight: "bold",
                padding: "0 10px",
              }}
            >
              {user.name.split(" ")[0]}
            </span>
            what's up?
          </Greeting>
          <UserInfo>
            <ProfileWrapper>
              <ProfileImage src={user.profilePictureUrl} alt="Profile" />
            </ProfileWrapper>
            <UserDetail>
              <Detail>
                <FieldName>Name</FieldName> {user.name}
              </Detail>
              <Detail>
                <FieldName>Email</FieldName> {user.email}
              </Detail>
            </UserDetail>
          </UserInfo>
        </ContentWrapper>
      )}
    </Container>
  );
}

export default MyProfile;
