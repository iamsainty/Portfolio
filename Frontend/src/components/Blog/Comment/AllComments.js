import React, { useContext, useEffect } from "react";
import commentContext from "../../context/comment/commentContext";
import styled from "styled-components";
import Comment from "./Comment";

const SecHeading = styled.h4`
  font-weight: bold;
  margin-top: 5vh;
`;

function AllComments({ blogId }) {
  const { comments, fetchComments } = useContext(commentContext);

  useEffect(() => {
    const fetchBlogComments = async () => {
      if (blogId) {
        await fetchComments(blogId);
      }
    };
    fetchBlogComments();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <SecHeading>Recent comments</SecHeading>
      {comments.map((comment) => {
        return (
          <>
            <Comment
              key={comment._id}
              comment={comment}
              userId={comment.userId}
            />
          </>
        );
      })}
    </>
  );
}

export default AllComments;
