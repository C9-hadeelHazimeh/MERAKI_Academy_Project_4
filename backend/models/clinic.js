
const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
clinicName: { type: String, required: true },
image: {string},
doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
review:[{ObjectId}]
});

module.exports = mongoose.model("Clinic", clinicSchema);



/*clinic Name

Doctors:[objectId from userSchema] */