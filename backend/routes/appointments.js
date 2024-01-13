const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const { bookAppointment,getAvailableAppointment,schedule,getBookedAppointment} = require("../controllers/appointments");
const appointmentsRouter = express.Router();
appointmentsRouter.get("/",authentication,getAvailableAppointment);
appointmentsRouter.post("/book",authentication,authorization("Create"),schedule)
appointmentsRouter.post("/:scheduleId/appointment",authentication,authorization("book"),bookAppointment);
appointmentsRouter.get("/getBooked",authentication,getBookedAppointment)
module.exports = appointmentsRouter;