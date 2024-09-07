import { Request, Response } from "express";
import { BadRequestErrorResponse } from "../../shared/error/error-response";
import { SuccessResponse } from "../../shared/response/success-response";
import { validationPipe } from "../../shared/validation/validation";
import { CalculateEmiDto } from "../dto/calculate-emi.dto";
import EmiService from "../service/emi.service";
import { SuccessMessage } from "../../message/success/success-message";
import { ErrorMessage } from "../../message/error/error-message";
import { PaginationOptions } from "../types";

export default class EmiController {
  private emiService: EmiService;

  constructor() {
    this.emiService = new EmiService();
  }

  public calculateEmi = async (req: Request, res: Response) => {
    const error = await validationPipe(CalculateEmiDto, req.body);
    if (error) {
      return new BadRequestErrorResponse(res, error);
    }

    const {
      loan_amount,
      interest_rate,
      loan_tenure_months,
      prepayment_amount,
    }: CalculateEmiDto = req.body;
    const result = await this.emiService.calculateEmi({
      loan_amount,
      interest_rate,
      loan_tenure_months,
      prepayment_amount,
    });

    return new SuccessResponse(res, SuccessMessage.EmiCalculated, result);
  };

  public getAllEmis = async (req: Request, res: Response) => {
    const {
      page = 1,
      pageSize = 10,
      sortColumn = "createdAt",
      sortDirection = "ASC",
    } = req.query as unknown as PaginationOptions;
    const emis = await this.emiService.getAllEmis(
      page,
      pageSize,
      sortColumn,
      sortDirection,
    );
    return new SuccessResponse(res, SuccessMessage.EmiRetrieved, emis);
  };

  public getEmiById = async (req: Request, res: Response) => {
    const emi = await this.emiService.getEmiById(req.params.id);
    if (!emi) {
      return new BadRequestErrorResponse(res, ErrorMessage.EmiNotFound);
    }
    return new SuccessResponse(res, SuccessMessage.EmiRetrieved, emi);
  };
}
