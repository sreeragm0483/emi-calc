// common
import { IRoute } from "../../shared/types/IRoute";
import { Router } from "express";

// controller
import EmiController from "../controller/emi.controller";

export default class EmiRoute implements IRoute {
  public router: Router = Router();
  private emiController: EmiController;
  public path: string = "/emis";

  constructor() {
    this.emiController = new EmiController();
    this.initRoutes();
  }

  private initRoutes = () => {
    this.router.post(
      `${this.path}/calculate-emi-flow`,
      this.emiController.calculateEmi,
    );
    this.router.get(`${this.path}/`, this.emiController.getAllEmis);
    this.router.get(`${this.path}/:id`, this.emiController.getEmiById);
  };
}
