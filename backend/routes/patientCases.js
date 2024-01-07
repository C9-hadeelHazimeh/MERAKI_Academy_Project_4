
const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const {createPatientCase} = require("../controllers/patientCase");
const patientCaseRouter = express.Router();

patientCaseRouter.post("/:patientId/create",authentication,authorization("Create"),createPatientCase)

module.exports = patientCaseRouter;

