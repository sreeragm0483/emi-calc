import { productionLogger } from "./prod.logger";
import { developmentLogger } from "./dev.logger";

export const logger =
  process.env.NODE_ENV === "production" ? productionLogger : developmentLogger;
