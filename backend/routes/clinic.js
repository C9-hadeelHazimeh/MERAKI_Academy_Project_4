const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const {addnewDoctor, getAllClinics} = require("../controllers/clinics");
const clinicRouter = express.Router();

clinicRouter.post("/create",authentication,authorization("Create"),addnewDoctor);
clinicRouter.get("/get",authentication,getAllClinics);


module.exports =clinicRouter;