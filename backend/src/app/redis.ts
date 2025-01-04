import { createClient } from "redis";
import logger from "./logging";

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("connect", () => {
  logger.info("Redis connected successfully");
});

redisClient.on("error", (err) => {
  logger.error(`Redis connection error: ${err}`);
});

redisClient.connect().catch((err) => {
  logger.error(`Failed to connect to Redis: ${err}`);
});

export default redisClient;