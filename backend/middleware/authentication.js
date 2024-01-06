const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//check if the user is logged in 
const authentication = (req, res, next) => {

  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ").pop();
    // console.log(token);
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      req.token = parsedToken;
      // console.log(parsedToken);
      next();
    } catch {
      res
        .status(403)
        .json({success: false, message: `The token is invalid or expired`});
    }
    //Forbidden
  } else {
    res.status(403).json({success: false, message: `Forbidden`});
  }
};

module.exports = authentication;
