import mongoose from "mongoose";

const PostModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    totalDonatedAmount: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    imageUrl: { type: String, required: false },
    donors: [
      {
        fullName: { type: String, required: true },
        total_amount: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostModel);
