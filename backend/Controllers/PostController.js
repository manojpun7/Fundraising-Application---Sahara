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
      // Upload base64 image to Cloudinary
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

export { createPost, fetchPosts };
