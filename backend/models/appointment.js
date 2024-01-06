
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
patient:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },//Patient :object id from userSchema
schedule:{type: mongoose.Schema.Types.ObjectId, ref: "Schedule"},
//doctor:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },// doctor:object id from userSchema how?
//clinic:{ type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
//isBooked:{type:Boolean,default:false},
//date:{type:String}
// date:{type:Date},//schema

// isBooked:{type:Boolean,default:false}
});

module.exports = mongoose.model("Appointment", appointmentSchema);

