const express = require("express");
const authentication=require("../middleware/authentication")
const { register, login,getUserRole } = require("../controllers/users");

// routers
const usersRouter = express.Router();
usersRouter.post("/register", register);
usersRouter.post("/login",login);
usersRouter.get("/",authentication,getUserRole)

module.exports = usersRouter;
