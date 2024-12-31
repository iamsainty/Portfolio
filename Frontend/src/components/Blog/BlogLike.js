import React, { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import styled from "styled-components";
import userContext from "../context/user/userContext";
import blogActivityContext from "../context/blogActivity/blogActivityContext";

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 25px;
  margin: 5vh 0;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 650;
  height: 100%;
`;

const LikeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  border: 1px solid black;
  border-radius: 20px;
  padding: 7.5px;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.5, -0.75, 0.25, 1.5);

  &:hover {
    transform: scale(1.25);
  }
`;

function BlogLike({ blogPost }) {
  const [liked, setLiked] = useState(false);
  const { user, fetchUserDetails } = useContext(userContext);
  const { likeBlog } = useContext(blogActivityContext);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await fetchUserDetails();
        setLiked(blogPost.likes.includes(user._id))
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchDetails();
    // eslint-disable-next-line
  }, []);

  const handleLikeClick = async () => {
    try {
        setLiked(liked => !liked);
        await likeBlog(blogPost._id);
    } catch (error) {
        console.error("Error liking blog post:", error);
    }
  }

  return (
    <LikeSection>
      <Text>Love this post, give it a heart</Text>
      <LikeButton onClick={handleLikeClick}>
        {liked ? <FaHeart size={25} fill="#D2122E" /> : <FaRegHeart size={25} />}
      </LikeButton>
    </LikeSection>
  );
}

export default BlogLike;
