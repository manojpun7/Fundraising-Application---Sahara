import express from "express"


import { ApplicationController, fetchApplication, updateApplicationStatus } from "../Controllers/ApplicationController.js"


const ApplicationRouter =express.Router()



ApplicationRouter.post('/submission',ApplicationController)
ApplicationRouter.get('/fetch',fetchApplication)
ApplicationRouter.patch('/update-status/:id',updateApplicationStatus)



export default ApplicationRouter;