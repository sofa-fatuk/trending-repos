import mongoose from "mongoose";

const Repo = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  stargazers_count: { type: Number, required: true },
  git_url: { type: String, required: true },
});

export default mongoose.model("Repo", Repo);
