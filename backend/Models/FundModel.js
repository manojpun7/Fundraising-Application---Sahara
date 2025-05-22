import mongoose from "mongoose";

const fundDonationModel = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: Number,
  message: String,
  total_amount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export as ES6 Module

export const FundDonation = mongoose.model("FundDonation", fundDonationModel);
