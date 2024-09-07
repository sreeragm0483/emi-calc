import Emi from "../models/emi.model";

import {
  calculateEMI,
  calculateMonthWisePayments,
} from "../utils/emi-calculator";
import { EmiInput, EmiOutput } from "../types";
import { Op } from "sequelize";

export default class EmiService {
  public async calculateEmi(input: EmiInput): Promise<EmiOutput> {
    const {
      loan_amount,
      interest_rate,
      loan_tenure_months,
      prepayment_amount,
    } = input;
    const emi = calculateEMI(loan_amount, interest_rate, loan_tenure_months);
    const monthWisePayments = calculateMonthWisePayments(
      loan_amount,
      interest_rate,
      loan_tenure_months,
      prepayment_amount,
    );

    const emiRecord = await Emi.create({
      loan_amount,
      interest_rate,
      loan_tenure_months,
      emi,
      prepayment_amount: prepayment_amount || 0,
      remaining_balance:
        monthWisePayments[monthWisePayments.length - 1].remainingBalance,
    });

    return {
      id: emiRecord.id,
      loan_amount,
      interest_rate,
      loan_tenure_months,
      emi,
      prepayment_amount: prepayment_amount || 0,
      monthWisePayments,
    };
  }

  public async getAllEmis(
    page: number = 1,
    pageSize: number = 10,
    sortColumn?: string,
    sortDirection?: "ASC" | "DESC",
  ): Promise<{
    emis: unknown[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    const offset = (page - 1) * pageSize;

    const where = {};
    if (sortColumn && sortDirection) {
      where[Op.and] = [{ [sortColumn]: { [Op.ne]: null } }];
    }

    const { rows: emis, count: totalItems } = await Emi.findAndCountAll({
      where,
      order: [[sortColumn, sortDirection]],
      limit: pageSize,
      offset,
    });

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      emis,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }

  public async getEmiById(id: string): Promise<EmiOutput | null> {
    const emi = await Emi.findByPk(id);
    if (!emi) {
      return null;
    }

    const loanAmount = Number(emi.loan_amount);
    const interestRate = Number(emi.interest_rate);
    const loanTenureMonths = Number(emi.loan_tenure_months);
    const prepaymentAmount = Number(emi.prepayment_amount);

    const monthWisePayments = calculateMonthWisePayments(
      loanAmount,
      interestRate,
      loanTenureMonths,
      prepaymentAmount,
    );

    return {
      id: emi.id,
      loan_amount: loanAmount,
      interest_rate: interestRate,
      loan_tenure_months: loanTenureMonths,
      emi: Number(emi.emi),
      prepayment_amount: prepaymentAmount,
      monthWisePayments,
    };
  }
}
