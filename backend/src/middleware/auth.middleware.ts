import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { AuthRequest, ExtendedJWT } from "../types";

export default function auth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  // Get token from header
  const token = req.header("x-auth-token");

  if (!token) throw new Error("No token, authorization denied");

  // Verife token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as ExtendedJWT;

    req.user = decoded.user;
    next();
  } catch (err) {
    throw new Error("Token is not valid");
  }
}
