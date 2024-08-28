const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
  },
  startdate: {
    type: Date,
    required: true,
  },
  enddate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["ongoing", "completed", "planned"],
    default: "ongoing",
  },
  liveurl: {
    type: String,
  },
  githuburl: {
    type: String,
  },
  imageurl: {
    type: String,
  },
  blogurl: {
    type: String,
  },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;