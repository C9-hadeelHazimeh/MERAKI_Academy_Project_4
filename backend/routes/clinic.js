const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const {createClinic} = require("../controllers/clinics");
const clinicRouter = express.Router();

clinicRouter.post("/create",createClinic)

module.exports =clinicRouter;