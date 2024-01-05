const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// This function creates a new user (doctor or patient)
//register
const register = (req, res) => {
  const {
    name,
    age,
    email,
    password,
    phoneNumber,
    specialist,
    appointments,
    role,
    patientHistory,
  } = req.body;
  const newUser = new usersModel({
    name,
    age,
    email,
    password,
    phoneNumber,
    specialist/*specialist ? specialist : ""*/,
    appointments,
    role,
    patientHistory,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Account Created Successfully",
        user: result,
      });
     
      console.log(result);
    })
    .catch((err) => {
      if (err.keyPattern) {
        return res.status(409).json({
          success: false,
          message: "The email already exists",
        });
      }
      res.status(500).json({
        success: false,
        message: `Server Error`,
        Error: err.message,
      });
    });
   
};

//login function checks user login credentials

const login = (req, res) => {};

module.exports = {
  register,
  login,
};
