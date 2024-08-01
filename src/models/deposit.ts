import * as Sequelize from "sequelize";
import { DepositAndBonusModelInterface } from "../interfaces";
import { Database } from "./instance";
import User from "./user";
import BonusOption from "./bonusOption";
import { generateRandomHex } from "../helpers";

const sequelize = Database.sequelize;

const DepositAndBonus = sequelize.define<DepositAndBonusModelInterface>(
  "deposit_and_bonuses",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    depositAmount: {
      type: Sequelize.STRING(50),
      allowNull: false,
      field: "deposit_amount",
    },
    bonusOptionId: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "bonus_option_id",
      references: {
        model: BonusOption,
        key: "id",
      },
    },
    totalAmountWithBonus: {
      type: Sequelize.STRING(60),
      allowNull: false,
      field: "total_amount_with_bonus",
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      field: "user_id",
      references: {
        model: User,
        key: "id",
      },
    },
  }
);

DepositAndBonus.belongsTo(BonusOption, {
  foreignKey: "bonusOptionId",
  as: "bonusOption",
});

BonusOption.hasOne(DepositAndBonus, {
  foreignKey: "bonusOptionId",
  as: "depositAndBonus",
});

export default DepositAndBonus;
