// const appointment = require("../models/appointment");
const appointmentsModel = require("../models/appointment");
const scheduleModel=require("../models/schedule");
// process.env.DB_URI.appointments.getIndexes()

const schedule=((req,res)=>{
const {doctor,date,clinic}=req.body;
const newAppointment= new scheduleModel({doctor,date,clinic,isBooked:true});
 newAppointment.save().then((result)=>{
    res.status(201).json({
        success: true,
        message: "Appointment is booked Successfully",
        appointment: result,
       })
       console.log(result)
      }).catch((err)=>{
    res.status(500).json({
        success: false,
        message: `Server Error`,
        Error: err.message,
      });
 })

})


const getAvailableAppointment=(async(req,res)=>{

   try {
    //const newAppointment= new scheduleModel({doctor,date,clinic,isBooked:true});
    const checkBooking= await appointmentsModel.find({isBooked:false}).populate("schedule");

    if (!checkBooking.length) {
        res.status(200).json({
          success: true,
          message: `All appointments`,
         sechdule: checkBooking,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No appointments Yet`,
        });
      }
        }catch{
        res.status(500).json({
            success: false,
            message: `Server Error`,
            Error: err.message,
          });

    }
   
})

//in this function the patient can book from the schedule 
const bookAppointment=((req,res)=>{
 const {patient,schedule}=req.body;
 const newAppointment= new appointmentsModel({patient,schedule});
 newAppointment.save().then((result)=>{
    res.status(201).json({
        success: true,
        message: "Appointment is booked Successfully",
        appointment: result,
       })
       console.log(result)
      }).catch((err)=>{
    res.status(500).json({
        success: false,
        message: `Server Error`,
        Error: err.message,
      });
 })

})
 
module.exports={
bookAppointment,
schedule,
getAvailableAppointment
}