import express from "express"
import { helpBotController } from "../Controllers/HelpBotController.js"



const helpBotRouter =express.Router()





helpBotRouter.post('/bot',helpBotController)



export default helpBotRouter;