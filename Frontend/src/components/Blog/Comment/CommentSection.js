import React from "react";
import NewComment from "./NewComment";
import AllComments from "./AllComments";

function CommentSection({blogId, blogUrl}) {
  return (
    <>
      <NewComment blogId={blogId} blogUrl={blogUrl} />
      <AllComments blogId={blogId} />
    </>
  );
}

export default CommentSection;
