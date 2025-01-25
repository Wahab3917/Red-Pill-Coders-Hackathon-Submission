import mongoose, { Document, Schema, Types, Model } from "mongoose";

interface IEvent extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  createdBy: Types.ObjectId;
  eventPic: string;
  registeredUsers: number;
}

const eventModel: Schema<IEvent> = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
      minLength: [3, "Title must be at least 3 characters long"],
    },
    description: {
      type: String,
      required: true,
      minLength: [10, "Description must be at least 10 characters long"],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    eventPic: {
      type: String,
      // required: true,
    },
    registeredUsers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const EventModel: Model<IEvent> = mongoose.model<IEvent>("Event", eventModel);

export default EventModel;
