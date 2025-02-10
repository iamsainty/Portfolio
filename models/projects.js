import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  technologies: {
    type: [String],
  },
  liveLink: {
    type: String,
  },
  githubRepo: {
    type: String,
  },
  projectBlog: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now(),
  },
  endDate: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ["completed", "in-progress"],
  },
  // collaborators: {
  //   type: [
  //     {
  //       name: {
  //         type: String,
  //       },
  //       email: {
  //         type: String,
  //       },
  //     },
  //   ],
  // },
  permalink: {
    type: String,
  },
});

const Projects =
  mongoose.models.Projects || mongoose.model("Projects", projectSchema);

export default Projects;
