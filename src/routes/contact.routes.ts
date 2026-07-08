import { Router } from "express";
import { createContact, deleteContact, findContact, getContacts, updateContact } from "../controllers/contact.controller.js";
import { createContactSchema } from "../validations/contact.validation.js";
import { validate } from "../middlewares/validate.js";
const router = Router();

router.post("/", validate(createContactSchema),createContact);

router.get("/", getContacts);

router.get("/:id", findContact);

router.delete("/:id", deleteContact);

router.put("/:id", updateContact);


export default router;