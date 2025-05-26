import { Post } from "../Models/PostModel.js";
import cloudinary from "../config/cloudinaryConfig.js";

const createPost = async (req, res) => {
  try {
    const { title, description, targetAmount, deadline, image } = req.body;

    if (!title || !description || !targetAmount || !deadline) {
      return res.status(400).json({
        success: false,
        message: "All fields except image are required",
      });
    }

    let imageUrl = "";

    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "campaign_posts",
      });
      imageUrl = uploadRes.secure_url;
    }

    const newPost = new Post({
      title,
      description,
      targetAmount,
      deadline,
      imageUrl,
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (err) {
    console.error("Error creating post:", err);
    res
      .status(500)
      .json({ success: false, message: "error in create post controller" });
  }
};

const fetchPosts = async (req, res) => {
  try {
    const data = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, fetchedPosts: data });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const fetchSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      post: post,
    });

  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({
      success: false,
      message: "Server error in Post controller",
    });
  }
};

const addDonorToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const {fullName, total_amount } = req.body;

    if (!fullName || !total_amount) {
      return res.status(400).json({ error: "Name and amount are required" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.donors.push({ fullName, total_amount });
    post.totalDonatedAmount += total_amount;

    await post.save();

    res.status(200).json({
      message: "Donation recorded successfully.",
      post,
    });
  } catch (error) {
    console.error("Error donating:", error);
    res.status(500).json({ error: "Internal Server Error in AddDonorToPost controller" });
  }
};

export { createPost, fetchPosts, addDonorToPost, fetchSinglePost };
