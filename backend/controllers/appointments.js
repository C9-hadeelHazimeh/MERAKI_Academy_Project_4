// const appointment = require("../models/appointment");
const appointmentsModel = require("../models/appointment");
const scheduleModel = require("../models/schedule");


const schedule = (async(req, res) => {
  const {doctorId}=req.params;
  const {date, clinic} = req.body;

  const availableAppointment = new scheduleModel({
    doctor:doctorId,
    date,
    clinic,
    isBooked: false,
  });
//check if the doctor is available at this date 
  const checkDoctor= await scheduleModel.findOne({ doctor: doctorId,
    date:date});
  console.log("Doctor:",checkDoctor)

 if (checkDoctor)
 {
  return res.status(400).json({
    success: false,
    message: "Doctor is already scheduled for the specified date",
  });
 }
  availableAppointment
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Appointment is available to be booked",
        availableAppointment: result,
      });
      console.log(result);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        Error: err.message,
      });
    });
});

const getAvailableAppointment = async (req, res) => {
  try {
    //const newAppointment= new scheduleModel({doctor,date,clinic,isBooked:true});
    const checkBooking = await scheduleModel
      .find({ isBooked:false })
      .populate("doctor","name");
      console.log(checkBooking)

    if (checkBooking.length) {
      res.status(200).json({
        success: true,
        message: `All available appointments`,
        sechdule: checkBooking,
      });
    } else {
      res.status(409).json({
        success: false,
        message: `No appointments available`,
      });
    }
  } 
  
  catch(err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      Error: err.message,
    });
  }
};

//in this function the patient can book from the schedule
const bookAppointment = (async (req, res) => {
  const { patient } = req.body;
  const { scheduleId } = req.params;
  
  //check if the patient has an appointment at the same time 
  const existingAppointment = await appointmentsModel.findOne({
      patient: patient
  });

  if (existingAppointment) {
     return res.status(409).json({
      success: false,
      message: "Patient already has an appointment at this time.",
    });
  }
  //if the patient dosent have appointment at the same time=> create new appointment 

  const newAppointment = new appointmentsModel({
    schedule: scheduleId,
    patient,
  });

  const filter = { _id: scheduleId };
  const update = { isBooked: true };

  //find shcedulemodel=>find (scheduleid)if (isBooked=true) =>Appointment is already booked
  //else save the appointment 

  const checkschedule = await scheduleModel.findOne({ _id: scheduleId });
  console.log("checkschedule", checkschedule);
  
  if (checkschedule.isBooked) {
    res.status(409).json({
      success: false,
      message: "Appointment is already booked",
    });
  }
  newAppointment
    .save()
    .then(async (result) => {
      await scheduleModel.findOneAndUpdate(filter, update);
      res.status(201).json({
        success: true,
        message: "Appointment is booked Successfully",
        appointment: result,
      });
   
    })
   
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        Error: err.message,
      });
    });
});

module.exports = {
  bookAppointment,
  schedule,
  getAvailableAppointment,
};
