import mongoose from "mongoose";

const Repo = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  stargazers_count: { type: Number, required: true },
  html_url: { type: String, required: true },
  forks_count: { type: Number },
  language: { type: String },
  keys_url: { type: String },
});

export default mongoose.model("Repo", Repo);
