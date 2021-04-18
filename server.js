const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./configurations/connectDb");
const patientsRoute = require("./routes/patientsRoute");

dotenv.config();

const app = express();

//connection
connectDB();

//middleware
app.use(express.json());

app.use(morgan("dev"));

// routes
app.use("/api/patients", patientsRoute);

//home route
app.get("/", (req, res) => {
  res.send("<h1>welcome to my patients Api</h1>");
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server started ${port}`));