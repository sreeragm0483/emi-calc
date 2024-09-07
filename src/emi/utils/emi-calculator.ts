import { MonthlyPayment } from "../types";

export function calculateEMI(
  loanAmount: number,
  interestRate: number,
  loanTenureMonths: number,
): number {
  const r = interestRate / 12 / 100;
  const n = loanTenureMonths;
  const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return parseFloat(emi.toFixed(2));
}

export function calculateMonthWisePayments(
  loanAmount: number,
  interestRate: number,
  loanTenureMonths: number,
  prepayment: number = 0,
): MonthlyPayment[] {
  const emi = calculateEMI(loanAmount, interestRate, loanTenureMonths);
  let remainingBalance = loanAmount;
  const monthlyInterestRate = interestRate / 12 / 100;
  const payments: MonthlyPayment[] = [];

  for (let month = 1; month <= loanTenureMonths; month++) {
    const interestPaid = remainingBalance * monthlyInterestRate;
    let principalPaid = emi - interestPaid;
    let currentPrepayment = 0;

    if (month === 1 && prepayment > 0) {
      currentPrepayment = prepayment;
      principalPaid += prepayment;
    }

    remainingBalance -= principalPaid;

    if (remainingBalance <= 0) {
      principalPaid += remainingBalance;
      remainingBalance = 0;
    }

    payments.push({
      month,
      emiPaid: parseFloat(emi.toFixed(2)),
      interestPaid: parseFloat(interestPaid.toFixed(2)),
      principalPaid: parseFloat(principalPaid.toFixed(2)),
      prepayment: parseFloat(currentPrepayment.toFixed(2)),
      remainingBalance: parseFloat(remainingBalance.toFixed(2)),
    });

    if (remainingBalance === 0) break;
  }

  return payments;
}
