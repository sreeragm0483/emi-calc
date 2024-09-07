import { Sequelize } from "sequelize";
import { KEYS } from "./keys";

const sequelize = new Sequelize(
  KEYS.DB_NAME || "emi_calculator",
  KEYS.DB_USER || "postgres",
  KEYS.DB_PASSWORD || "",
  {
    host: KEYS.DB_HOST || "localhost",
    port: parseInt(KEYS.DB_PORT || "5432"),
    dialect: "postgres",
    logging: false,
  },
);

export default sequelize;
