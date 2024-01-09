const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/db");

const app = express();
const PORT = process.env.PORT || 5000;
// Import Routers
const usersRouter = require("./routes/users");
const roleRouter=require("./routes/roles");
const appointmentsRouter=require("./routes/appointments");
const patientCaseRouter=require("./routes/patientCases");
const clinicRouter=require("./routes/clinic")
app.use(cors());
app.use(express.json());

// Routes Middleware
app.use("/users", usersRouter);
app.use("/roles",roleRouter);
app.use("/appointments",appointmentsRouter);
app.use("/cases",patientCaseRouter);
app.use("/clinics",clinicRouter);
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
