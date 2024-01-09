const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  reviewer: {type: mongoose.Schema.Types.ObjectId, ref: "User"},//userId
  review: [{ type: String, required: true }],
  doctor:{type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model("Review", reviewsSchema);