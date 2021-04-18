const Joi = require("joi")
//register staff validation
const validateAddStaff = new Joi.object( {
    name:Joi.string().min(4).required().max(150),
    email:Joi.string().min(10).max(200).email().required(),
    password:Joi.string().min(8).max(50).required()
}) 

module.exports= {validateAddStaff};