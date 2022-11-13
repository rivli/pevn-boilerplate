import Server from "./server";
import app from "./app";
import * as dotenv from "dotenv";
import socket from "./socket";

// Init config
dotenv.config();

const PORT = parseInt(process.env.PORT) || 8000;
const server = new Server(app, PORT);
server.start(socket);
