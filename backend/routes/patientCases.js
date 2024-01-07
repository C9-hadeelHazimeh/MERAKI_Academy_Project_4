
const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const {createPatientCase} = require("../controllers/patientCase");
const patientCaseRouter = express.Router();

patientCaseRouter.post("/create",authentication,authorization("create"),createPatientCase)


module.exports = patientCaseRouter;

