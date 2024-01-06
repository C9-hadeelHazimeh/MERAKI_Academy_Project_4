
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
patient:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },//Patient :object id from userSchema
schedule:{type: mongoose.Schema.Types.ObjectId, ref: "Schedule"},
// date:{type:Date},//schema
clinic:{ type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
// isBooked:{type:Boolean,default:false}
});

module.exports = mongoose.model("Appointment", appointmentSchema);

