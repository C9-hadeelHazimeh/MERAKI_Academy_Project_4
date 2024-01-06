const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema= new mongoose.Schema({
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

userSchema.pre("save", async function(){
this.email=this.email.toLowerCase();
this.password=await bcrypt.hash(this.password,10);
})

module.exports=mongoose.model("User",userSchema)