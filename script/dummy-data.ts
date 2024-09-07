
import Emi from "../src/emi/models/emi.model";
import sequelize from "../src/config/db.config";
import {
  calculateEMI,
  calculateMonthWisePayments,
} from "../src/emi/utils/emi-calculator";

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

async function generateDummyData() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await Emi.sync({ force: true });

    const dummyData = [
      {
        loan_amount: 9999,
        interest_rate: 8.5,
        loan_tenure_months: 12,
        prepayment_amount: 0,
      },
      {
        loan_amount: 250000,
        interest_rate: 9.0,
        loan_tenure_months: 24,
        prepayment_amount: 10000,
      },
      {
        loan_amount: 500000,
        interest_rate: 7.5,
        loan_tenure_months: 36,
        prepayment_amount: 25000,
      },
      {
        loan_amount: 750000,
        interest_rate: 8.0,
        loan_tenure_months: 48,
        prepayment_amount: 0,
      },
      {
        loan_amount: 1000000,
        interest_rate: 7.0,
        loan_tenure_months: 60,
        prepayment_amount: 50000,
      },
    ];

    for (const data of dummyData) {
      const emi = calculateEMI(
        data.loan_amount,
        data.interest_rate,
        data.loan_tenure_months,
      );
      const monthWisePayments = calculateMonthWisePayments(
        data.loan_amount,
        data.interest_rate,
        data.loan_tenure_months,
        data.prepayment_amount,
      );

      await Emi.create({
        loan_amount: data.loan_amount,
        interest_rate: data.interest_rate,
        loan_tenure_months: data.loan_tenure_months,
        emi: emi,
        prepayment_amount: data.prepayment_amount,
        remaining_balance:
          monthWisePayments[monthWisePayments.length - 1].remainingBalance,
      });
    }

    console.log("Dummy data has been generated successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
}

generateDummyData();
