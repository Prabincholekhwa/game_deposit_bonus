import * as Sequelize from "sequelize";
import { UserModelInterface } from "../interfaces";
import { Database } from "./instance";
import { generateRandomHex } from "../helpers";
import DepositAndBonus from "./deposit";

const sequelize = Database.sequelize;
const User = sequelize.define<UserModelInterface>("users", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    field: "id",
  },
  fullName: {
    type: Sequelize.STRING(50),
    allowNull: false,
    field: "full_name",
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false,
    field: "email",
    unique: true,
  },
  password: {
    type: Sequelize.STRING(70),
    allowNull: false,
    field: "password",
  },
});

User.hasMany(DepositAndBonus, {
  foreignKey: "userId",
  as: "depositAndBonuses",
});

DepositAndBonus.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default User;
