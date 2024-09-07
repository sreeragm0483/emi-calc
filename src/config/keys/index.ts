import dotenv from "dotenv";
dotenv.config();

const KEYS = {
  PORT: process.env.PORT || "3000",
  APP_URL: process.env.APP_URL || "http://localhost:3000",
  APP_URL_DEV: process.env.APP_URL_DEV || "http://localhost:3000",
  DB_NAME: process.env.DB_NAME || "mydatabase",
  DB_USER: process.env.DB_USER || "user",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",
  DB_HOST: process.env.DB_HOST || "db",
  DB_PORT: process.env.DB_PORT || "5432",
};

export { KEYS };
