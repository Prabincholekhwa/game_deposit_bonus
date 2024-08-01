import Joi from "joi";
import { stringSchema, emailSchema, passwordSchema } from "./schemas";

const createUser = Joi.object({
  fullName: stringSchema.required().label("fullName"),
  password: passwordSchema.required().label("password"),
  email: emailSchema.required().label("email"),
});

const loginUser = Joi.object({
  email: emailSchema.required().label("email"),
  password: passwordSchema.required().label("password"),
});

export { createUser, loginUser };
