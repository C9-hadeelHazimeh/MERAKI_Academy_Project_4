
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
patient:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },//Patient :object id from userSchema
doctor:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },// doctor:object id from userSchema how?
date:{type:Date},
// hour:{type:Number,required: true, unique: true},
clinic:{ type: mongoose.Schema.Types.ObjectId, ref: "Clinic" },
isBooked:{type:Boolean,default:false}
});

module.exports = mongoose.model("Appointment", appointmentSchema);

