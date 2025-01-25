import Joi from "joi";

const AdminLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default AdminLoginSchema;
