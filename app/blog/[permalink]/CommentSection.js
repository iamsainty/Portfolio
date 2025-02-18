import React from "react";
import NewComment from "./NewComment";

const CommentSection = () => {
  return (
    <section className="md:w-4/5 lg:w-3/5 container px-6 flex flex-col my-16 gap-8">
      <h3 className="text-3xl font-bold mb-4">Comments</h3>
      <NewComment />
    </section>
  );
};

export default CommentSection;
