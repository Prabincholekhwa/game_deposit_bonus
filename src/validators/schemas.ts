import joi from "joi";

const Joi = joi as typeof joi;

const stringSchema = Joi.string();

const numberSchema = Joi.number();

const emailSchema = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
  .lowercase();

const passwordSchema = Joi.string()
  .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]{6,}$/)
  .min(6)
  .messages({
    "string.pattern.base":
      "Password must include at least one letter, one number, and one special character",
    "string.min": "Password must have a minimum length of 6 characters",
  });

export { stringSchema, numberSchema, emailSchema, passwordSchema };
