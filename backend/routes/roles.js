const express = require("express");
const { createRole} = require("../controllers/roles");

// routers
const roleRouter = express.Router();
roleRouter.post("/role", createRole);


module.exports = roleRouter;