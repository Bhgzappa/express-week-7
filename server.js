const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./configurations/connectDb");
const patientsRoute = require("./routes/patientsRoute");
const staffRoute = require("./routes/staffRoute");
const cors = require("cors");

dotenv.config();

const app = express();

//connection
connectDB();

//middleware
app.use(express.json());

app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/patients", patientsRoute);
app.use("/api/staff", staffRoute);

//home route
app.get("/", (req, res) => {
  res.send("<h1>welcome to my patients Api</h1>");
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started ${port}`));
