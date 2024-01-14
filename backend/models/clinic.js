
const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
clinicName: [{ type: String, required: true }],
image: {type:String},
doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
reviews:[{type: mongoose.Schema.Types.ObjectId, ref: "Review"}]
});

module.exports = mongoose.model("Clinic", clinicSchema);



/*clinic Name

Doctors:[objectId from userSchema] */
// "Clinic validation failed: clinicName: Path `clinicName` is required."