const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const {addnewDoctor, getAllClinics,getClinicNames,getByDoctorId,deleteDoctorById} = require("../controllers/clinics");
const clinicRouter = express.Router();
clinicRouter.get("/clinicNames",getClinicNames)
clinicRouter.post("/create",authentication,authorization("Create"),addnewDoctor);
clinicRouter.get("/get",authentication,getAllClinics);
clinicRouter.get("/get/:doctorId",authentication,getByDoctorId)

clinicRouter.delete("/delete",authentication,deleteDoctorById)
module.exports =clinicRouter;