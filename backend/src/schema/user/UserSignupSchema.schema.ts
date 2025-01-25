import joi from "joi";

const UserSignupSchema = joi.object({
  name: joi.string().required().min(3),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export default UserSignupSchema;
