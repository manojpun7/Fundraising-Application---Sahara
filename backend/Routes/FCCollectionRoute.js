import express from "express"
import { FCCollectionController, fetchFCCollection } from "../Controllers/FCCollectionController.js";



const FCCollectionRouter =express.Router()





FCCollectionRouter.post('/donate',FCCollectionController)
FCCollectionRouter.get('/fetch',fetchFCCollection)



export default FCCollectionRouter;