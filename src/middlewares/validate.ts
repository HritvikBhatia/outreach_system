import { ZodError, type ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";

export function validate(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error instanceof ZodError ? error.issues : [],
      });
    }
  };
}