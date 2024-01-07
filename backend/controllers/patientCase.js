const patientCase = require("../models/patientCase");
const patient=require("../models/users");

const createPatientCase = (req, res) => {
  const {diagnosis, treatment } = req.body;
     //doctor from token 
  const doctor=req.token.userId;
  //determined patient
  const {patientId}=req.params;
  const newCase = new patientCase({ diagnosis, treatment });
  newCase
    .save()
    .then(async (result) => {
      await patient.findOneAndUpdate(
        { _id: patientId },
        { $push: { patientHistory:result } },

        { new: true, useFindAndModify: false }
      );
console.log(result)
      res.status(201).json({
        success: true,
        message: "diagnosis and treatment are created",
        patientHistory: result,
      });
    }).catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        Error: err.message,
      });
    });
};
module.exports = {
  createPatientCase,
};
