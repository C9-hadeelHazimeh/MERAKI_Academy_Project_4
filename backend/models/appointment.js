
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
patient:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },//Patient :object id from userSchema
doctor:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },// doctor:object id from userSchema how?
date:{type:Date},
hour:{type:TimeRanges},
clinic:{ type: mongoose.Schema.Types.ObjectId, ref: "Clinic" }
});

module.exports = mongoose.model("Appointment", appointmentSchema);



// Appointment Schema:

// Patient :object id from userSchema

// doctor:object id from userSchema

// date: date

// hour: ??

// clinic: object id clinic