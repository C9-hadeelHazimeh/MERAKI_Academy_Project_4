// const appointment = require("../models/appointment");
const appointmentsModel = require("../models/appointment");
const scheduleModel = require("../models/schedule");


const schedule = (req, res) => {
  const { doctor, date, clinic } = req.body;
  const availableAppointment = new scheduleModel({
    doctor,
    date,
    clinic,
    isBooked: false,
  });
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
};

const getAvailableAppointment = async (req, res) => {
  try {
    //const newAppointment= new scheduleModel({doctor,date,clinic,isBooked:true});
    const checkBooking = await appointmentsModel
      .find({ isBooked: false })
      .populate("schedule");

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
  } catch {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      Error: err.message,
    });
  }
};

//in this function the patient can book from the schedule
const bookAppointment = async (req, res) => {
  const { patient } = req.body;
  const { scheduleId } = req.params;
  const newAppointment = new appointmentsModel({
    schedule: scheduleId,
    patient: patient,
  });
  const filter = { _id: scheduleId };
  const update = { isBooked: true };
  //  console.log("newAppointment",newAppointment)
 
  //find shcedulemodel=>find (scheduleid)if (isBooked=true) =>Appointment is already booked
  //else save the appointment 
  const checkschedule = await scheduleModel.findOne({ _id: scheduleId });
  console.log("checkschedule", checkschedule.isBooked);
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
};

module.exports = {
  bookAppointment,
  schedule,
  getAvailableAppointment,
};
