import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import userAuthContext from "../../context/userAuth/userAuthContext";

const CommentBox = styled.div`
  border: 1px solid #bbb;
  border-radius: 10px;
  padding: 15px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserText = styled.p`
  font-size: 14px;
  color: black;
  margin: 0;
  font-weight: bold;
`;

const CommentText = styled.div``;

function Comment({ comment, userId }) {
  const { userById, fetchUserDetailsById } = useContext(userAuthContext);

  useEffect(() => {
    const fetchUserById = async () => {
      if (userId) {
        await fetchUserDetailsById(userId);
      }
    };
    fetchUserById();
    // eslint-disable-next-line
  }, []);

  if (!userById) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CommentBox>
        <UserDetails>
          <ProfileImage
            src={
              userById.profilePictureUrl || "/media/Default/DefaultProfile.png"
            }
            alt={userById.name}
          />
          <UserText>{userById.name}</UserText>
        </UserDetails>
        <CommentText>{comment.comment}</CommentText>
      </CommentBox>
    </>
  );
}

export default Comment;
