// const appointment = require("../models/appointment");
const appointmentsModel = require("../models/appointment");
const scheduleModel = require("../models/schedule");

const schedule = async (req, res) => {
  const doctorId = req.token.userId;
  const { date, clinic, time } = req.body;
  //date
  const selectedDate = new Date(date);
  const formattedDate = selectedDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  //time
  const fullTime = time;

  //  console.log("Date", formattedDate, "Time", fullTime);

  const availableAppointment = new scheduleModel({
    doctor: doctorId,
    date: formattedDate,
    time: fullTime,
    clinic,
    isBooked: false,
  });

  // check if the doctor is available at this date
  const checkDoctor = await scheduleModel.findOne({
    doctor: doctorId,
    date: formattedDate,
    time: fullTime,
  });

  if (checkDoctor) {
    return res.status(400).json({
      success: false,
      message: "Doctor is already scheduled for the specified date and time",
    });
  }

  availableAppointment
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Appointment is available to be booked",
        availableAppointment: result,
        userId: doctorId,
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

const getAvailableAppointment = async (req, res) => {
  const patient = req.token.userId;
  try {
    const checkBooking = await scheduleModel
      .find({ isBooked: false })
      .populate("doctor", "name");
    // console.log(checkBooking)

    if (checkBooking.length) {
      return res.status(200).json({
        success: true,
        message: `All available appointments`,
        sechdule: checkBooking,
        patient: patient,
      });
    }

    res.status(409).json({
      success: false,
      message: `No appointments available`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      Error: err.message,
    });
  }
};

//in this function the patient can book from the schedule
const bookAppointment = async (req, res) => {
  const patient = req.token.userId;
  //console.log("req.token.userId",req.token.userId,patient)
  const { scheduleId } = req.params;

  //check if the patient has an appointment at the same time
  // const existingAppointment = await appointmentsModel.findOne({
  //     patient: patient
  // });

  // if (existingAppointment) {
  //    return res.status(409).json({
  //     success: false,
  //     message: "Patient already has an appointment at this time.",
  //   });
  // }
  //if the patient dosent have appointment at the same time=> create new appointment

  const newAppointment = new appointmentsModel({
    schedule: scheduleId,
    patient: patient,
  });

  const filter = { _id: scheduleId };
  const update = { isBooked: true };

  //find shcedulemodel=>find (scheduleid)if (isBooked=true) =>Appointment is already booked
  //else save the appointment

  const checkschedule = await scheduleModel.findOne({ _id: scheduleId });
  // console.log("checkschedule", checkschedule);

  if (checkschedule.isBooked) {
    return res.status(409).json({
      success: false,
      message: "Appointment is already booked",
    });
  }

  newAppointment
    .save()
    .then(async (result) => {
      //console.log("patient",result)
      await scheduleModel.findOneAndUpdate(filter, update);
      res.status(201).json({
        success: true,
        message: "Appointment is booked Successfully",
        patient: patient,
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
