import express from "express"


import { ApplicationController, fetchApplication } from "../Controllers/ApplicationController.js"


const ApplicationRouter =express.Router()



ApplicationRouter.post('/submission',ApplicationController)
ApplicationRouter.get('/fetch',fetchApplication)



export default ApplicationRouter;