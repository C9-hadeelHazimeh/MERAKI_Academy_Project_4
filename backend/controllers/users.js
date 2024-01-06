const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// This function creates a new user (doctor or patient)
//register
const doctorRole = "65982ab69f7abfedd3987f24";
const patientRole = "6598fbf3e6714864454352bd";

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
    specialist /*specialist ? specialist : ""*/,
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

      // console.log(result);
    })
    .catch((err) => {
      // console.log("err",err)
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

const login = (req, res) => {
  const email = req.body.email.toLowerCase();
  const password=req.body.password;
  usersModel
    .findOne({ email }).populate("role")
    .then(async (result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: "The email or password is not correct",
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: "The email or password is not correct",
          });
        }
        const payLoad = {
          userId: result._id,
          role: result.role,
          
        };
        const options = { expiresIn: "60m" };
        const token = jwt.sign(payLoad, process.env.SECRET, options);
        res.status(201).json({
          success: true,
          message: "Valid login Credentials",
          token: token,
        });
      } catch (err) {
        throw new Error(err.message);
      }
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
  register,
  login,
};
