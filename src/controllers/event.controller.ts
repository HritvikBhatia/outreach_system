import type { Request, Response } from "express";
import Event from "../models/event.js";

export async function createEvent(req: Request, res: Response) {
  try {
    const event = await Event.create(req.body);

    return res.status(201).json(event);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create event",
    });
  }
}

export async function getEvents(req: Request, res: Response) {
  try {
    const events = await Event.find().populate(
      "selectedContacts",
      "name phone city"
    );

    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch events",
    });
  }
}

export async function getEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const event = await Event.findById(id).populate(
      "selectedContacts",
      "name phone city"
    );

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch event",
    });
  }
}

export async function updateEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).populate("selectedContacts", "name phone city");

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update event",
    });
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    return res.status(200).json({
      message: "Event deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete event",
    });
  }
}