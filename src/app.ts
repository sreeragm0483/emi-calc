import express from "express";
import { IRoute } from "./shared/types/IRoute";
import dotenv from "dotenv";
import sequelize from "./config/db.config";
dotenv.config();
import cors from "cors";
import "express-async-errors";

import errorHandler from "./shared/middleware/error-handler";
import pageNotFound from "./shared/error/not-found";
import { KEYS } from "./config/keys";

class App {
  public app: express.Application;
  public start: string;
  public port: string;

  constructor(routes: IRoute[]) {
    this.start = "/api/v1";
    this.app = express();
    this.initDb();
    this.initMiddleware();
    this.initRoutes(routes);
    this.port = KEYS.PORT;
    this.initErrorHandler();
  }

  private initMiddleware = () => {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: [KEYS.APP_URL, KEYS.APP_URL_DEV],
        credentials: true,
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "UPDATE"],
      }),
    );
  };

  private initRoutes = (routes: IRoute[]) => {
    routes.forEach((route) => {
      this.app.use(this.start, route.router);
    });
  };

  private initErrorHandler = () => {
    this.app.use(pageNotFound);
    this.app.use(errorHandler);
  };

  private initDb = async () => {
    sequelize
      .sync()
      .then(() => {
        console.log("Database synchronized");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
  };

  public listen = () => {
    this.app.listen(this.port, () => {
      console.log(`connected to port ${this.port}`);
    });
  };

  public getApp = () => {
    return this.app;
  };
}

export default App;
