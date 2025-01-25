import joi from "joi";

const EventCreationSchema = joi.object({
  title: joi.string().required().min(3).messages({
    "string.min": "Title must be at least 3 characters long",
  }),
  description: joi.string().required().min(10).messages({
    "string.min": "Description must be at least 10 characters long",
  }),
  startDate: joi.date().required(),
  endDate: joi.date().required(),
  location: joi.string().required(),
  createdBy: joi.string().required(),
  eventPic: joi.string().required(),
});

export default EventCreationSchema;
