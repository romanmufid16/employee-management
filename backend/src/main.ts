import dotenv from "dotenv";
import web from "./app/web";
import logger from "./app/logging";

dotenv.config();
const PORT = process.env.PORT || 3000;

web.listen(PORT, () => {
  logger.info(`Server listening on ${PORT}`);
});
