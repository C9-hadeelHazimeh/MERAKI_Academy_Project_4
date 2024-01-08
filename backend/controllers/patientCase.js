const patientCase = require("../models/patientCase");
const patient = require("../models/users");

const createPatientCase = (req, res) => {
  const { diagnosis, treatment } = req.body;
  //doctor from token
  const doctor = req.token.userId;
  //determined patient
  const { patientId } = req.params;
  const newCase = new patientCase({ diagnosis, treatment });
  newCase
    .save()
    .then(async (result) => {
      await patient.findOneAndUpdate(
        { _id: patientId },
        { $push: { patientHistory: result } },

        { new: true, useFindAndModify: false }
      );
      console.log(result);
      res.status(201).json({
        success: true,
        message: "diagnosis and treatment are created",
        patientHistory: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        Error: err.message,
      });
    });
};

const getPatientHistory = (req, res) => {
  //get by patient id
  const { patientId } = req.params;
  console.log(patientId);
  patient
    .findOne({ _id: patientId }).populate("patientHistory name")
    .then((result) => {
      console.log("result", result);
      if (!result) {
        res.status(409).json({
          success: false,
          message: "No patient History is saved",
        });
      }
      res.status(200);
      res.json({
        success: true,
        message: `The patient History ${patientId}`,
        patientHistory: result,
      });
    })

    .catch((err) => {
      res.status(500);
      res.json({
        success: false,
        message: `Server Error`,
        Error: err.message,
      });
    });
};

const updateHistoryById = () => {};

module.exports = {
  createPatientCase,
  getPatientHistory,
};
