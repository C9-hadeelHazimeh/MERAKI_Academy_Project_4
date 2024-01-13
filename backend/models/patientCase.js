
const mongoose = require("mongoose");

const patientCaseSchema = new mongoose.Schema({
  doctor: {type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // diagnosisDate:{type: mongoose.Schema.Types.ObjectId, ref: "Appointments"},
  diagnosis:[{type: String}],
  treatment:[{type: String}],
  //appointment
  appointment:{type:mongoose.Schema.Types.ObjectId, ref: "Appointment" }
});

module.exports = mongoose.model("PatientCase", patientCaseSchema);



