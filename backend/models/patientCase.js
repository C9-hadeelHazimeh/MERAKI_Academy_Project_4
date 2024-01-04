
const mongoose = require("mongoose");

const patientCaseSchema = new mongoose.Schema({
  doctorName: { type: String, required: true },
  diagnosisDate:{type: mongoose.Schema.Types.ObjectId, ref: "Appointments"},
  diagnosis:[{type: String}],
  treatment:[{type: String}],
});

module.exports = mongoose.model("PatientCase", patientCaseSchema);



// Array of object: { DoctorName: objectId from Appointment

//     Date:Object Id from Appointment
    
//     Diagnosis:[]
    
//     treatment:[]
    
//     }