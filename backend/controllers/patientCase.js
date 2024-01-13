const patientCase = require("../models/patientCase");
const patient = require("../models/users");

const createPatientCase = (req, res) => {
  const { diagnosis, treatment } = req.body;
  //doctor from token
  const doctor = req.token.userId;
  //determined patient
  const { patientId } = req.params;
  const newCase = new patientCase({diagnosis,treatment});
  console.log(newCase)
  newCase
    .save()
    .then(async (result) => {
      console.log("result",result)
      await patient.findByIdAndUpdate(
        { _id: patientId },
        {  $push: { patientHistory: result._id} },
        {new:true}
      )
     
      res.status(201).json({
        success: true,
        message: "diagnosis and treatment are created",
        doctor:doctor,
        patientHistory: result,
        patient:patientId
        // doctorName:result.doctor
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
  .findOne({ _id: patientId })
  .populate("patientHistory")
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
        message: "The patient History",
        patientHistory: result.patientHistory,
        patientName:result.name
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

const updateHistoryById = (req, res) => {
  const {historyId} = req.params;
  doctor=req.token.userId;
  const filter = req.body;
  console.log(filter)
  Object.keys(filter).forEach((key) => {
    filter[key].toString().replaceAll(" ", "") == "" && delete filter[key];
  });
  patientCase
    .findOneAndUpdate({ _id: historyId }, req.body, { new: true }).populate("doctor")
    .then((result) => {
      console.log("Result",result)
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `The patient History with id => ${historyId} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `patient History updated`,
        doctor:doctor,
        upatedpatientCase:result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};








module.exports = {
  createPatientCase,
  getPatientHistory,
  updateHistoryById
};
