const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const {createClinic, getAllClinics} = require("../controllers/clinics");
const clinicRouter = express.Router();

clinicRouter.post("/create",createClinic);
clinicRouter.get("/get",authentication,getAllClinics);


module.exports =clinicRouter;