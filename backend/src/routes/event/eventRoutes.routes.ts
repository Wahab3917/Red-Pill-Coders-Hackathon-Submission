import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../../controllers/event/eventController.controller";
import authenticationMiddleware from "../../middlewares/authenticationMiddleware.middleware";
import authorizationMiddleware from "../../middlewares/authorizationMiddleware.middleware";
import multer from "multer";
import cloudinaryConfig from "../../config/cloudinaryConfig";

cloudinaryConfig();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router: Router = Router();

router.post(
  "/v1/events/create-event",
  authenticationMiddleware(),
  upload.single("eventPic"),
  createEvent
);
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
