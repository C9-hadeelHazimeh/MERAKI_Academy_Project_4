const clinicModel = require("../models/clinic")

//in this function new docotor can be added to the clinic adding name and image
const addnewDoctor=async(req,res)=>{
    const {clinicName,image} = req.body;
    const doctor = req.token.userId;
    const newDoctor = new clinicModel({clinicName,image,doctor});
    //check if the doctor is already registered at the same clinic

    const checkDoctor= await clinicModel.findOne({ doctor: doctor,
        clinicName:clinicName});

      console.log("Doctor:",checkDoctor)
    
     if (checkDoctor)
     {
      return res.status(400).json({
        success: false,
        message: "the doctor is already registered at this clinic ",
      });
     }
   newDoctor
      .save()
      .then((result) => {
        console.log("result",result)
        res.status(201).json({
          success: true,
          message: "doctor Added successfully",
          clinicInfo: result,
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

// const addnewDoctor=(req,res)=>{
// //add the doctor by clinic id 
//     const {clinicId }= req.params;
//     const {image } = req.body;
//     const doctor = req.token.userId;
//     const newDoctor = new clinicModel({
//       doctors:doctor,
//       image,
//     });
//     newDoctor
//       .save()
//       .then((result) => {
//         clinicModel
//           .findByIdAndUpdate(
//             { _id: clinicId },
//             { $push: { doctors: result } },
//             { new: true }
//           )
//           .then(() => {
//             res.status(201).json({
//               success: true,
//               message: `Comment added`,
//               comment: result,
//             });
//           })
//           .catch((err) => {
//             res.status(500).json({
//               success: false,
//               message: `Server Error`,
//               err: err.message,
//             });
//           });
//       })
//       .catch((err) => {
//         res.status(500).json({
//           success: false,
//           message: `Server Error`,
//           err: err.message,
//         });
//       });
//   };


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

//getByClinicName
//get By Dr Id
//delete by DrId
//create review


module.exports = {
    addnewDoctor,
    getAllClinics
  };