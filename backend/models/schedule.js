const mongoose = require("mongoose");
const scheduleSchema = new mongoose.Schema({
doctor:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },// doctor:object id from userSchema how?
clinic:{ type: String },
isBooked:{type:Boolean,default:false},
date:{type:String}
})
module.exports = mongoose.model("Schedule", scheduleSchema);