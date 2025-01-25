import { Request, Response } from "express";
import EventCreationSchema from "../../schema/event/EventCreationSchema.schema";
import ErrorHandler from "../../helpers/ErrorHandler";
import EventModel from "../../models/event/Event.model";
import ResponseHandler from "../../helpers/ResponseHandler";
import AdminModel from "../../models/admin/Admin.model";
import NodeCache from "node-cache";
import authenticationMiddleware from "../../middlewares/authenticationMiddleware.middleware";

const cache = new NodeCache();

export const createEvent = async (req: Request, res: Response) => {
  const {
    title,
    description,
    startDate,
    endDate,
    location,
    createdBy,
    eventPic,
  } = req.body;

  const { error } = EventCreationSchema.validate(req.body);
  if (error) {
    return ErrorHandler.send(res, 400, error.details[0].message);
  }

  try {
    const admin = await AdminModel.findOne({ _id: createdBy });
    if (!admin) {
      return ErrorHandler.send(res, 404, "Admin not found");
    }

    const event = await EventModel.create({
      title,
      description,
      startDate,
      endDate,
      location,
      createdBy,
      eventPic,
    });
    if (!event) {
      return ErrorHandler.send(res, 400, "Event creation failed");
    }

    cache.del("events");
    return ResponseHandler.send(
      res,
      201,
      "Event created successfully",
      event,
      ""
    );
  } catch (error: any) {
    return ErrorHandler.send(res, 500, error.message);
  }
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    let getEvents;

    if (cache.has("events")) {
      getEvents = JSON.parse(cache.get("events") as string);
      return ResponseHandler.send(
        res,
        200,
        "Events fetched successfully (cached)",
        { length: getEvents.length, getEvents },
        ""
      );
    } else {
      getEvents = await EventModel.find();
      cache.set("events", JSON.stringify(getEvents), 60);
      return ResponseHandler.send(
        res,
        200,
        "Data fetched from database",
        { length: getEvents.length, getEvents },
        ""
      );
    }
  } catch (error: any) {
    return ErrorHandler.send(res, 500, error.message);
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const { title, description, startDate, endDate, location, eventPic } =
    req.body;

  try {
    const event = await EventModel.findByIdAndUpdate(
      eventId,
      { title, description, startDate, endDate, location, eventPic },
      { new: true }
    );

    if (!event) {
      return ErrorHandler.send(res, 404, "Event not found");
    }

    cache.del("events");

    return ResponseHandler.send(
      res,
      200,
      "Event updated successfully",
      event,
      ""
    );
  } catch (error: any) {
    return ErrorHandler.send(res, 500, error.message);
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;

  try {
    const event = await EventModel.findByIdAndDelete(eventId);

    if (!event) {
      return ErrorHandler.send(res, 404, "Event not found");
    }

    cache.del("events");

    return ResponseHandler.send(
      res,
      200,
      "Event deleted successfully",
      event,
      ""
    );
  } catch (error: any) {
    return ErrorHandler.send(res, 500, error.message);
  }
};
