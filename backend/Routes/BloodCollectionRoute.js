import express from "express"


import { BloodCollectionController,fetchBloodCollection } from "../Controllers/BloodCollectionController.js"


const BloodCollectionRouter =express.Router()

BloodCollectionRouter.post('/donate',BloodCollectionController)
BloodCollectionRouter.get('/fetch',fetchBloodCollection)



export default BloodCollectionRouter;