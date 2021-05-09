const Staff = require("../models/staffSchema");
const bcrypt = require("bcryptjs");
const { validateAddStaff } = require("../validations/staffValidations");
const getToken = require("../utils/getToken");

const staffSignUp = async (req, res) => {
  //validate a staff
  const { error } = validateAddStaff.validate(req.body);
  if (error) return res.status(403).send(error.details[0].message);

  //complexity level and hashing using bcrypt
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //find staff from db
  const emailFound = await Staff.findOne({ email: req.body.email });
  if (emailFound) return res.status(403).send("email already exist");

  const newStaff = new Staff({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    confirmPassword: hashedPassword,
  });
  await newStaff.save();
  res.status(201).json({
    _id: newStaff._id,
    name: newStaff.name,
    email: newStaff.email,
    token: getToken(newStaff._id),
  });
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

  // res.header("authorization", token_id).send(token_id);

  // res.json({ staff });
  res.status(202).json({
    _id:staff._id,
    name:staff.name,
    email:staff.email,
    token:getToken(staff._id)
  })
};

module.exports = { staffSignUp, staffLogin };