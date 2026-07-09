import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
  startCallingWorkflow,
} from "../controllers/event.controller.js";

import { validate } from "../middlewares/validate.js";
import { createEventSchema } from "../validations/event.validation.js";

const router = Router();

router.get("/", getEvents);

router.get("/:id", getEvent);

router.post("/", validate(createEventSchema), createEvent);

router.put("/:id", validate(createEventSchema), updateEvent);

router.delete("/:id", deleteEvent);

router.post("/:id/start-calling", startCallingWorkflow);

export default router;
