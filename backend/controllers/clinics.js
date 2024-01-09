const clinicModel = require("../models/clinic")

//in this function new docotor can be added to the clinic adding name and image
const createClinic=(req,res)=>{
    const {clinicName,reviews} = req.body;
    const newClinic = new clinicModel({clinicName,reviews});
    console.log(newClinic)
   newClinic
      .save()
      .then((result) => {
        console.log("result",result)
        res.status(201).json({
          success: true,
          message: "Clinic created",
          clinic: result,
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

const addnewDoctor=(req,res)=>{
//add the doctor by clinic id 


    const {clinicId }= req.params;
    const { doctors,image } = req.body;
    const docotors = req.token.userId;
    const newDoctor = new clinicModel({
      doctors,
      image,
    });
    newDoctor
      .save()
      .then((result) => {
        articlesModel
          .findByIdAndUpdate(
            { _id: clinicId },
            { $push: { Doctors: result } },
            { new: true }
          )
          .then(() => {
            res.status(201).json({
              success: true,
              message: `Comment added`,
              comment: result,
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              message: `Server Error`,
              err: err.message,
            });
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


const getAllClinics=(req,res)=>
{       const userId = req.token.userId;
        clinicModel
          .find()
          .populate("clinicName")
          .exec()
          .then((clinics) => {
            if (clinics.length) {
              res.status(200).json({
                success: true,
                message: `All the clinics`,
                userId: userId,
                clinics: clinics,
              });
            } else {
              res.status(200).json({
                success: false,
                message: `No clinics Yet`,
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






module.exports = {
    createClinic,
    getAllClinics
  };