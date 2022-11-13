import jwt from "jsonwebtoken";
import { ExtendedError } from "socket.io/dist/namespace";
import { ExtendedJWT, SocketWithUser } from "../../types";

export default function authorization(
  socket: SocketWithUser,
  next: (err?: ExtendedError) => void
) {
  // Check if no token
  if (!socket.handshake.query && !socket.handshake.query.token) {
    next(new Error("No token, authorization denied"));
  }

  const token = socket.handshake.query.token as string;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as ExtendedJWT;

    socket.user = decoded.user;
    next();
  } catch (err) {
    next(err);
  }
}
