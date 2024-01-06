const express = require("express");
const authentication=require("../middleware/authentication");
const authorization=require("../middleware/authorization");
const { bookAppointment } = require("../controllers/appointments");
const appointmentsRouter = express.Router();
appointmentsRouter.post("/appointment",authentication,authorization("Book"),bookAppointment);

module.exports = appointmentsRouter;