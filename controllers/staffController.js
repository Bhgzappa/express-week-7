const Staff = require("../models/staffSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateAddStaff } = require("../validations/staffValidations");

const staffSignUp = async (req, res) => {
  //validate a staff
  const { error } = validateAddStaff.validate(req.body);
  if (error) return res.status(403).send(error.details[0].message);

  //complexity level and hashing using bcrypt
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //find user from db
  const emailFound = await Staff.findOne({ email: req.body.email });
  if (emailFound) return res.status(403).send("email already exist");

  const newStaff = new Staff({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  await newStaff.save();
  res.status(201).json(newStaff);
};

const staffLogin = async (req, res) => {
  //staff verification
  const staff = await Staff.findOne({ email: req.body.email });
  if (!staff) return res.status(404).send("Account does not exist");

  //password verification
  const verifiedPassword = await bcrypt.compare(
    req.body.password,
    staff.password
  );
  if (!verifiedPassword)
    return res.status(404).send("email does not match with password");

  //assign a token
  const token_id = jwt.sign({ _id: staff._id }, process.env.SECRET_CODE, {
    expiresIn: "30d",
  });

  res.header("authorization", token_id).send(token_id);

  res.json({ staff });
};

module.exports = { staffSignUp, staffLogin };
