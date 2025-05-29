import mongoose from "mongoose";
import { Application } from "../Models/ApplicationModel.js";
import cloudinary from "../config/cloudinaryConfig.js";

const ApplicationController = async (req, res) => {
  try {
    const {
      fullname,
      phonenumber,
      email,
      location,
      reason,
      fundamount,
      image,
    } = req.body;

    if (
      !fullname ||
      !phonenumber ||
      !email ||
      !reason ||
      !location ||
      !fundamount
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    let imageUrl = "";

    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        folder: "campaign_posts",
      });
      imageUrl = uploadRes.secure_url;
    }

    const application = new Application({
      fullname,
      phonenumber,
      email,
      location,
      reason,
      fundamount,
      imageUrl,
    });
    await application.save();
    return res.status(200).json({
      success: true,
      message: "Application for donation submitted successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Error during application submiting:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "error in application submission controller",
        error,
      });
  }
};

const fetchApplication = async (req, res) => {
  try {
    const fetchedApplication = await Application.find({});

    res.json({ success: true, data: fetchedApplication });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
// Update status (approve/reject)
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'approved' or 'rejected'",
      });
    }

    const updatedApp = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedApp) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }

    res.json({
      success: true,
      message: `Application ${status} successfully`,
      data: updatedApp,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Server error in update application status controller",
      });
  }
};

const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deletedApplication = await Application.findByIdAndDelete(id);

    if (!deletedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({
      message: "Application deleted successfully",
      success: true,
      deletedApplication,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      message: "Server error during deletion",
      error: error.message,
    });
  }
};

export {
  ApplicationController,
  fetchApplication,
  updateApplicationStatus,
  deleteApplication,
};
