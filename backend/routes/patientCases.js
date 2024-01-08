
const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const {createPatientCase,getPatientHistory,updateHistoryById} = require("../controllers/patientCase");
const patientCaseRouter = express.Router();

patientCaseRouter.post("/create/:patientId",authentication,authorization("Create"),createPatientCase)
patientCaseRouter.get("/get/:patientId",getPatientHistory)
patientCaseRouter.put("/update/:historyId",authentication,authorization(),updateHistoryById)
module.exports = patientCaseRouter;

