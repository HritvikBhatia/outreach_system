import type { Request, Response } from "express";
import Contact from "../models/contact.js";

export async function createContact(req: Request, res: Response) {
  try {

    const contact = await Contact.create(req.body);

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create contact",
    });
  }
}

export async function getContacts(req: Request, res: Response) {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contacts",
    });
  }
}

export async function findContact(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
        return res.status(404).json({
            message: "Contact not found"
        });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contacts",
    });
  }
}

export async function deleteContact(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
        return res.status(404).json({
            message: "Contact not found"
        });
    }
    
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contacts",
    });
  }
}

export async function updateContact(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndUpdate(id, req.body, {new: true});

    if (!contact) {
        return res.status(404).json({
            message: "Contact not found"
        });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contacts",
    });
  }
}
