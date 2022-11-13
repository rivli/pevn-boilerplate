import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

export function APIErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(error);
  res.status(500);
  res.json({
    message: error.message || error,
  });
}
