import mongoose from "mongoose";

const PostModel = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  deadline: { type: Date, required: true },
  imageUrl: { type: String, required: false },
}, { timestamps: true });

export const Post = mongoose.model("Post", PostModel);
