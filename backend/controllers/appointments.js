const appointment = require("../models/appointment");
const appointmentsModel = require("../models/appointment");

const bookAppointment=(req,res)=>{
const {patient,doctor,date,hour,clinic}=req.body;
// const specificDate = new Date('2024-01-06T12:00:00Z');
const newAppointment= new appointmentsModel({patient,doctor,date,clinic,isBooked:true});

const check= appointmentsModel.find({isBooked:false});// if true the appointment is available
 console.log("check:",check);

//check if the appointemnt is reserved 
if (!check){
    return res.status(409).json({
        success: false,
        message: "The appointment has been already reserved,please choose anthor time",
    });
}

newAppointment.save()
.then((result) => {
    res.status(201).json({
      success: true,
      message: "Appointment is booked Successfully",
      appointment: result,
      //isbooked=true
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
 const 

module.exports={
bookAppointment,
}