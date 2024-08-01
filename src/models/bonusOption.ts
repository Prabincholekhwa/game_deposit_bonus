import * as Sequelize from "sequelize";
import { BonusOptionModelInterface } from "../interfaces";
import { BonusOptionEnum } from "../enums/modelEnums";
import { Database } from "./instance";
import { generateRandomHex } from "../helpers";
import DepositAndBonus from "./deposit";

const sequelize = Database.sequelize;

const BonusOption = sequelize.define<BonusOptionModelInterface>(
  "bonus_options",
  {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    bonusType: {
      type: Sequelize.ENUM(...Object.values(BonusOptionEnum)),
      allowNull: false,
      field: "bonus_type",
    },
    bonusPercent: {
      type: Sequelize.STRING,
      allowNull: true,
      field: "bonus_percent",
    },
  }
);

// BonusOption.hasOne(DepositAndBonus, {
//   foreignKey: "bonusOptionId",
//   as: "depositAndBonus",
// });

export default BonusOption;
