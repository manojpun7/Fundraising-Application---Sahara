import express from "express";
import { createPost, fetchPosts } from "../Controllers/PostController.js";

const CreatePostRouter = express.Router();

CreatePostRouter.post("/create", createPost);
CreatePostRouter.get("/fetch", fetchPosts);

export default CreatePostRouter;
