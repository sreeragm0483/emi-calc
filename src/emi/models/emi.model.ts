import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/db.config";

class Emi extends Model {
  public id!: number;
  public loan_amount!: number;
  public interest_rate!: number;
  public loan_tenure_months!: number;
  public emi!: number;
  public prepayment_amount!: number;
  public remaining_balance!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Emi.init(
  {
    loan_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    interest_rate: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    loan_tenure_months: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emi: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    prepayment_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0,
    },
    remaining_balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Emi",
  },
);

export default Emi;
