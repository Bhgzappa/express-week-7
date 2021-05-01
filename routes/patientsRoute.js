const express = require("express");
const {
  createPatient,
  getAllPatients,
  getSinglePatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientsController");
const secure = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(secure, createPatient).get(getAllPatients);
router
  .route("/:_id")
  .get(secure, getSinglePatient)
  .put(secure, updatePatient)
  .delete(secure, deletePatient);

module.exports = router;
