const clinicModel = require("../models/clinic");

//this function is to render the clinic names
const getClinicNames = (req, res) => {
  const clinicNames = ["Derma", "Dental", "General"];
  return res.status(200).json({
    success: true,
    clinics: clinicNames,
  });
};

//in this function new docotor can be added to the clinic adding name and image to sepcific clinic names
//clinicName=["Derma","Dental","general"]

const addnewDoctor = async (req, res) => {
  const { clinicName, image } = req.body;
  const doctor = req.token.userId;
  const newDoctor = new clinicModel({ clinicName, image, doctor });
  //check if the doctor is already registered at the same clinic

  const checkDoctor = await clinicModel.findOne({
    doctor: doctor,
    clinicName: clinicName,
  });

  //   console.log("Doctor:",checkDoctor)

  if (checkDoctor) {
    return res.status(400).json({
      success: false,
      message: "the doctor is already registered at this clinic ",
    });
   }
  // const DoctorName=clinicModel.findById({_id:doctor})
  //  console.log(DoctorName);
  
  newDoctor
    .save()
    .then((result) => {
      console.log("result", result);
      res.status(201).json({
        success: true,
        message: "doctor Added successfully",
        clinicInfo: result,
        doctor:doctor
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        Error: err.message,
      });
    });
}
const getAllClinics = (req, res) => {
  const userId = req.token.userId;
  clinicModel
    .find()
    .populate("reviews").populate("doctor","name").populate("clinicName")
    .exec()
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: "All the Information",
          userId: userId,
          doctorInfo: result,
        });
      } else {
        res.status(409).json({
          success: false,
          message: `No doctors added to the clinic yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

//the patient can render the doctors info
const getByDoctorId = (req, res) => {
  const userId = req.token.userId;
  const { doctorId } = req.params;
  clinicModel
    .find({ doctor: doctorId })
    .populate("doctor", "name")
    .exec()
    .then((result) => {
      if (result.length) {
        res.status(200).json({
          success: true,
          message: "",
          userId: userId,
          doctorInfo: result,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No doctors added yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

//delete by DrId
const deleteDoctorById = (req,res) => {
  const doctor= req.token.userId;
  console.log(doctor)
  clinicModel
  .findOneAndDelete(doctor)
  .then((result) => {
  console.log(result)
    if (!result) {
    return res.status(404).json({
    success: false,
   message: "The doctor is not found",
      });
      }
      res.status(200).json({
        success: true,
        message: "doctor Info deleted",
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

//create review

module.exports = {
  addnewDoctor,
  getAllClinics,
  getClinicNames,
  getByDoctorId,
  deleteDoctorById
};
