const mongoose = require("mongoose");

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    doa: {
      type: String,
      required: true,
    },
    dod: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;