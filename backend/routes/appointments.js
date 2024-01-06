const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const { bookAppointment,getAllAppointment,schedule } = require("../controllers/appointments");
const appointmentsRouter = express.Router();
appointmentsRouter.get("/",authentication,getAllAppointment);
appointmentsRouter.post("/book",schedule)
appointmentsRouter.post("/appointment",authentication,authorization("Book"),bookAppointment);

module.exports = appointmentsRouter;