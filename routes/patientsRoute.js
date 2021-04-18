const express = require("express");
const {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientsController");

const router = express.Router();

router.route("/").post(createPatient).get(getAllPatients);
router
  .route("/:_id")
  .get(getSinglePatient)
  .put(updatePatient)
  .delete(deletePatient);

module.exports = router;
