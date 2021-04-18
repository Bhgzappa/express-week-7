const express = require("express");
const { staffSignUp, staffLogin } = require("../controllers/usersController");

const router = express.Router();

router.route("/register").post(staffSignUp);
router.route("/login").post(staffLogin);

module.exports = router;
