import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/event.controller.js";

import { validate } from "../middlewares/validate.js";
import { createEventSchema } from "../validations/event.validation.js";

const router = Router();

router.get("/", getEvents);

router.get("/:id", getEvent);

router.post("/", validate(createEventSchema), createEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

export default router;