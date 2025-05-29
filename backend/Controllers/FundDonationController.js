import { FundDonation } from "../Models/FundModel.js";

export const CreateFundController = async (req, res) => {
  try {
    const { fullName, email, phone, message, total_amount } = req.body;

    const newDonation = new FundDonation({
      fullName,
      email,
      phone,
      message,
      total_amount,
    });

    await newDonation.save();

    res
      .status(201)
      .json({
        message: "Donation recorded successfully." + fullName,
        email,
        phone,
        message,
        total_amount,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "CreateFundController Failed to save donation." });
  }
};

export const fetchFundCollection = async (req, res) => {
  try {
    const fetchedFundCollection = await FundDonation.find({});
    res.json({ success: true, data: fetchedFundCollection });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: " fetchFundCollection Error fetching data." });
  }
};
