export interface EmiInput {
  loan_amount: number;
  interest_rate: number;
  loan_tenure_months: number;
  prepayment_amount?: number;
}

export interface MonthlyPayment {
  month: number;
  emiPaid: number;
  interestPaid: number;
  principalPaid: number;
  prepayment: number;
  remainingBalance: number;
}

export interface EmiOutput extends EmiInput {
  id: number;
  emi: number;
  monthWisePayments: MonthlyPayment[];
}
export interface PaginationOptions {
  page?: number;
  pageSize?: number;
  sortColumn?: string;
  sortDirection?: "ASC" | "DESC";
}
