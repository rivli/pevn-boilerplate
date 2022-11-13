import { existsSync, mkdirSync } from "fs";
import pino from "pino";

function formatDate() {
  const d = new Date();
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDay();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return {
    day,
    month,
    year,
    forName: [day, month, year].join(""), // DDMMYYYY
  };
}

const date = formatDate();
const fileName = date.forName + ".log";
const filePath = "./logs/" + date.year + "/" + date.month;

if (!existsSync(filePath)) {
  mkdirSync(filePath, { recursive: true });
}

const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      level: process.env.NODE === "production" ? "info" : "trace",
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: "yyyy-dd-mm, h:MM:ss TT",
      },
    },
    {
      target: "pino/file",
      level: process.env.NODE === "production" ? "info" : "trace",
      options: {
        destination: filePath + "/" + fileName,
      },
    },
  ],
});

const logger = pino(transport);
logger.level = process.env.NODE === "production" ? "info" : "trace";

export { logger };
