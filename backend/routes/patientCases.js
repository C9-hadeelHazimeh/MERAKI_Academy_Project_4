
const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const {createPatientCase,getPatientHistory,updateHistoryById} = require("../controllers/patientCase");
const patientCaseRouter = express.Router();

patientCaseRouter.post("/create",authentication,authorization("Create"),createPatientCase)
patientCaseRouter.get("/get/:patientId",getPatientHistory)
patientCaseRouter.put("/update/:historyId",authentication,authorization("update"),updateHistoryById)
module.exports = patientCaseRouter;

