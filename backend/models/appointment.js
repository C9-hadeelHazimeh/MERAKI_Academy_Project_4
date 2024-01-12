
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
patient:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },//Patient :object id from userSchema
schedule:{type: mongoose.Schema.Types.ObjectId, ref: "Schedule"},

});

module.exports = mongoose.model("Appointment", appointmentSchema);

