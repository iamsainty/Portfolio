import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  coverimage: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  content: {
    type: [],
  },
  permalink: {
    type: String,
    unique: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Page = mongoose.models.Page || mongoose.model("Page", pageSchema);

export default Page;
