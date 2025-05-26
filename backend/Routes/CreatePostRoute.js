import express from "express";
import {
  addDonorToPost,
  createPost,
  fetchPosts,
  fetchSinglePost,
} from "../Controllers/PostController.js";

const CreatePostRouter = express.Router();

CreatePostRouter.post("/create", createPost);
CreatePostRouter.post("/add-donor-to-post/:postId", addDonorToPost);
CreatePostRouter.get("/fetch", fetchPosts);
CreatePostRouter.get("/fetch-single-post/:id", fetchSinglePost);

export default CreatePostRouter;
