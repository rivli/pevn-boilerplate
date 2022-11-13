import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Socket } from "socket.io";

interface SocketWithUser extends Socket {
  user: string;
}

interface ExtendedJWT extends JwtPayload {
  user: string;
}

interface dbResult {
  [key: string]: any;
}

interface AuthRequest extends Request {
  user: string;
}

export { SocketWithUser, ExtendedJWT, dbResult, AuthRequest };
