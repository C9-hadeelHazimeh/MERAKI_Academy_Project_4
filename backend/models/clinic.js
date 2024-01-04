
const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
clinicName: { type: String, required: true },
doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Clinic", clinicSchema);



/*clinic Name

Doctors:[objectId from userSchema] */