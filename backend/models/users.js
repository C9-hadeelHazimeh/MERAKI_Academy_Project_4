const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema=({
    name: { type: String },
    age: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber:{type: Number},
    specialist:{type: String },
    appointments:[{ type: mongoose.Schema.Types.ObjectId, ref: "Appointments"}],
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    patientHistory:[{type: mongoose.Schema.Types.ObjectId, ref: "PatientCase"}]
});
//pre middleware
module.exports=mongoose.model("User",userSchema)