const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const { bookAppointment,getAvailableAppointment,schedule } = require("../controllers/appointments");
const appointmentsRouter = express.Router();
appointmentsRouter.get("/",authentication,getAvailableAppointment);
appointmentsRouter.post("/:doctorId/book",schedule)
appointmentsRouter.post("/:scheduleId/appointment",authentication,authorization("book"),bookAppointment);

module.exports = appointmentsRouter;