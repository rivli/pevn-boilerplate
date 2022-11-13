import { Server } from "socket.io";
import http from "http";
import { logger } from "../utils/logger";
import authorization from "./middleware/auth.socket";
import { SocketWithUser } from "../types";

export class SocketServer {
  io: Server;

  constructor(io?: Server) {
    if (io) this.io = io;
  }

  async init(server: http.Server) {
    const io = new Server(server, {
      cors: {
        origin: ["http://localhost:3000"],
      },
    });
    logger.info("[socket]: Socket initialised.");
    io.use(authorization);
    this.io = io;
  }

  registerHandlers() {
    this.io.sockets.on("connection", async function (socket: SocketWithUser) {
      logger.info(`[socket]: connected user - ${socket.user}`);
      await this.setSocketId(socket.user, socket.id);

      // Here handlers

      socket.on("join_room", async () => {
        // Do something
      });

      socket.on("disctonnect", async function () {
        logger.info(`[socket]: disconnected user - ${socket.user}`);
        await this.setSocketId(socket.user, null);
      });
    });
  }

  setSocketId(login: string, socketId: string) {
    // Connect id with user in bd
  }
}

const socket = new SocketServer();
export default socket;
