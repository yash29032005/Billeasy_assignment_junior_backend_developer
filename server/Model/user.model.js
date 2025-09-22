const mongoose = require("mongoose");
const Joi = require("joi");

//user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

//Joi validation for registration
function validateRegister(userdata) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(userdata);
}

//Joi validation for login
function validateLogin(userdata) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(userdata);
}

module.exports = {
  User,
  validateRegister,
  validateLogin,
};
