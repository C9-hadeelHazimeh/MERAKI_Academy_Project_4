const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const { bookAppointment,getAvailableAppointment,schedule } = require("../controllers/appointments");
const appointmentsRouter = express.Router();
appointmentsRouter.get("/",authentication,getAvailableAppointment);
appointmentsRouter.post("/book",schedule)
appointmentsRouter.post("/:scheduleId/appointment",authentication,authorization("Book"),bookAppointment);

module.exports = appointmentsRouter;