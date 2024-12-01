import React, { useContext, useEffect } from "react";
import commentContext from "../../context/comment/commentContext";
import styled from "styled-components";
import Comment from "./Comment";

const SecHeading = styled.h4`
  font-weight: bold;
  margin-top: 5vh;
`;

const NoCommentMsg = styled.p`
  margin: 2.5vh 0;
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
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            userId={comment.userId}
          />
        ))
      ) : (
        <NoCommentMsg>
          No comments yet! Be the first to share your thoughts.
        </NoCommentMsg>
      )}
    </>
  );
}

export default AllComments;
