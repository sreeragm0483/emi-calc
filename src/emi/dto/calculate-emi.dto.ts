import { IsNumber, IsPositive, Min } from "class-validator";

export class CalculateEmiDto {
  @IsNumber()
  @IsPositive()
  loan_amount: number;

  @IsNumber()
  @IsPositive()
  @Min(0.01)
  interest_rate: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  loan_tenure_months: number;

  @IsNumber()
  @Min(0)
  prepayment_amount?: number;
}
