import express from "express"


import { ApplicationController, fetchApplication, updateApplicationStatus,deleteApplication } from "../Controllers/ApplicationController.js"


const ApplicationRouter =express.Router()



ApplicationRouter.post('/submission',ApplicationController)
ApplicationRouter.get('/fetch',fetchApplication)
ApplicationRouter.patch('/update-status/:id',updateApplicationStatus)
ApplicationRouter.delete('/delete/:id',deleteApplication)



export default ApplicationRouter;