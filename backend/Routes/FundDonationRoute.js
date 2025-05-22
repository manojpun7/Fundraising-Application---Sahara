import express from "express";
import { CreateFundController, fetchFundCollection } from "../Controllers/FundDonationController.js";

const CreateFundDonationRouter = express.Router();

CreateFundDonationRouter.post("/create", CreateFundController);
CreateFundDonationRouter.get("/fetch", fetchFundCollection);

export default CreateFundDonationRouter;