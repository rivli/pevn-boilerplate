import express from "express";
import cors from "cors";
import { APIErrorHandler } from "./middleware/error-handler.middleware";
import router from "./routes";

const app = express();

app.use(cors({ credentials: true, origin: ["http://localhost:300"] }));

// If there is frontend
// app.use(express.stattic("../test/dist"));

app.get("/_health", (req, res) => res.send("ok"));
app.use("/api", router);
app.use(APIErrorHandler);

export default app;
