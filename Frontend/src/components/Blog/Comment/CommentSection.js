import React from "react";
import NewComment from "./NewComment";
import AllComments from "./AllComments";

function CommentSection({blogId}) {
  return (
    <>
      <NewComment blogId={blogId} />
      <AllComments blogId={blogId} />
    </>
  );
}

export default CommentSection;
