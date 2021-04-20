const express = require("express");
const {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientsController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createPatient).get(getAllPatients);
router
  .route("/:_id")
  .get(protect, getSinglePatient)
  .put(protect, updatePatient)
  .delete(protect, deletePatient);

module.exports = router;
