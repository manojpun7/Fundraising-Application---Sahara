import { Application } from "../Models/ApplicationModel.js";

const ApplicationController = async (req, res) => {
  try {
    const { fullname, phonenumber, email, location, reason, fundamount } =
      req.body;

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

    const application = new Application({
      fullname,
      phonenumber,
      email,
      location,
      reason,
      fundamount,
    });
    await application.save();
    return res.status(200).json({
      success: true,
      message: "Application for donation submitted successfully",
    });
  } catch (error) {
    console.error("Error during application submiting:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
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
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { ApplicationController, fetchApplication, updateApplicationStatus };
