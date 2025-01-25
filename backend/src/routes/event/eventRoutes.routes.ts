import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../../controllers/event/eventController.controller";
import authenticationMiddleware from "../../middlewares/authenticationMiddleware.middleware";
import authorizationMiddleware from "../../middlewares/authorizationMiddleware.middleware";

const router: Router = Router();

router.post("/v1/events/create-event", authenticationMiddleware(), createEvent);
router.get("/v1/events/get-events", getEvents);
router.put(
  "/v1/events/update-event/:eventId",
  authenticationMiddleware(),
  authorizationMiddleware(),
  updateEvent
);
router.delete(
  "/v1/events/delete-event/:eventId",
  authenticationMiddleware(),
  authorizationMiddleware(),
  deleteEvent
);

export default router;
