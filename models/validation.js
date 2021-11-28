const Joi = require("joi");

const regScheme = (data) => {
  const schemaReg = Joi.object({
    username: Joi.string().required().trim().min(6),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).required(),
  });
  return schemaReg.validate(data);
};

const logScheme = (data) => {
  const schemaLog = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).max(16).required(),
  });
  return schemaLog.validate(data);
};

module.exports.regScheme = regScheme;

module.exports.logScheme = logScheme;
