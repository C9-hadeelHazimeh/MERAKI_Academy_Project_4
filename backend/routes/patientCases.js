
const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const {createPatientCase,getPatientHistory} = require("../controllers/patientCase");
const patientCaseRouter = express.Router();

patientCaseRouter.post("/create/:patientId",authentication,authorization("Create"),createPatientCase)
patientCaseRouter.get("/get/:patientId",getPatientHistory)
module.exports = patientCaseRouter;

