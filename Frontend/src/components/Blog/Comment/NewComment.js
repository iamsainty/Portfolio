import React, { useContext, useEffect, useState } from "react";
import firebaseAuthContext from "../../context/firebaseAuth/firebaseAuthContext";
import styled from "styled-components";
import commentContext from "../../context/comment/commentContext";

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  gap: 20px;
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserText = styled.p`
  font-size: 18px;
  color: black;
  margin: 0;
  font-weight: bold;
`;

const CommentInput = styled.textarea`
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  resize: none;
  height: 100px;
`;

const ErrorMsg = styled.p`
  margin: 0;
  font-size: 14px;
  color: red;
`;

const SubmitButton = styled.button`
  padding: 5px;
  border-radius: 25px;
  cursor: pointer;
  background-color: black;
  color: white;
  font-weight: bold;

  &:hover {
    background-color: #333;
  }

  @media (min-width: 768px) {
    width: 10vw;
  }
`;

const AccountBox = styled.div`
  border: 1px solid #999;
  border-radius: 10px;
  padding: 20px;
  margin-top: 5vh;
`;

const Heading = styled.h4`
  font-weight: bold;
`;

const Text = styled.p``;

const ButtonGroup = styled.div`
display: flex;
gap : 20px;
`;

const Button = styled.button`
  color: black;
  background-color: white;
  padding : 5px 15px;
  border-radius : 10px;
  border : 1px solid #999;
`;

function NewComment({ blogId }) {
  const { user, fetchUserDetails } = useContext(firebaseAuthContext);
  const { newComment } = useContext(commentContext);

  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

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

  const handleSubmit = () => {
    // check if the comment has 10 to  200 characters
    if (comment.length >= 10 && comment.length <= 200) {
      newComment(blogId, comment);
    } else {
      setError("Comment must be 10 to 200 characters long");
    }
  };

  return user ? (
    <CommentBox>
      <UserDetails>
        <ProfileImage
          src={user.profilePictureUrl || "/media/Default/DefaultProfile.png"}
          alt={user.name}
        />
        <UserText>Comment as {user.name}</UserText>
      </UserDetails>
      <CommentInput
        placeholder="Write your thoughts..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <SubmitButton onClick={handleSubmit}>Post</SubmitButton>
    </CommentBox>
  ) : (
    <>
      <AccountBox>
        <Heading>Have something to share?</Heading>
        <Text>Join the conversation by signing in below!</Text>
        <ButtonGroup>

        <Button className="btn btn-outline-dark">Sign In</Button>
        <Button className="btn btn-outline-dark">Sign Up</Button>
        </ButtonGroup>
      </AccountBox>
    </>
  );
}

export default NewComment;
