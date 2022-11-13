import http from "http";
import db from "./db";
import { SocketServer } from "./socket";
import { logger } from "./utils/logger";

class Server {
  app: Express.Application;
  server: http.Server;
  private readonly PORT: number;

  constructor(app: Express.Application, PORT: number) {
    this.app = app;
    this.PORT = PORT;
  }

  async start(socket?: SocketServer) {
    logger.info("[server]: Starting...");

    const server = http.createServer(this.app);

    if (socket) {
      socket.init(server);
    }

    server.listen(this.PORT, () => {
      logger.info(`[server]: Server started at port ${this.PORT}`);
      db.init();
    });

    this.server = server;
    this.setupCloseOnExit();
  }

  // Thanks to https:blog.heroku.com/best-practices-nodejs-error
  terminate(options = { coredump: false, timeout: 500 }) {
    // Exit function
    const exit = (code: number) => {
      logger.info("[process]: porcess is terminated");
      options.coredump ? process.abort() : process.exit(code);
    };

    return (code: number, reason: string) => (err: any, promise: any) => {
      logger.info(
        `Server is shutting down, reason = ${reason}. Starting cleanup.`
      );
      if (err && err instanceof Error) {
        logger.error(err);
      }

      // Attempt a graceful shutdown. Closing server and database connection.
      this.server.close((err) => {
        if (err) logger.error(err);
        logger.info("Server is shutted down.");

        // Close db connection heroku

        logger.info("Cleanup is finished.");
        exit(code);
      });

      // If cleanup not finished on a given time, process will be froced to shut down
      setTimeout(() => exit(code), options.timeout); // .unref()
    };
  }

  // ensures we close the server in the event of an error.
  setupCloseOnExit() {
    const exitHandler = this.terminate({
      coredump: false,
      timeout: 10000,
    });

    process.on("uncaughtException", exitHandler(1, "Unexpected Error"));
    process.on("unhandledRejection", exitHandler(1, "unhandledRejection"));
    process.on("SIGTERM", exitHandler(0, "SIGTERM"));

    // cathces ctrl+c event
    process.on("SIGINT", exitHandler(0, "SIGINT"));

    // cathces "kill pid" (for example: nodemon restart)
    process.on("SIGUSR1", exitHandler(0, "SIGUSR1"));
    process.on("SIGUSR2", exitHandler(0, "SIGUSR2"));
  }
}

export default Server;
