import * as Sequelize from "sequelize";
import { ModelTimestampExtend } from "../../interfaces";

export interface InputDepositAndBonusInterface {
  id?: string;
  depositAmount: string;
  bonusOptionId: string;
  totalAmountWithBonus: string;
  userId: string;
}

export interface DepositAndBonusInterface extends ModelTimestampExtend {
  id: string;
  depositAmount: string;
  bonusOptionId: string;
  totalAmountWithBonus: string;
  userId: string;
}

export interface DepositAndBonusModelInterface
  extends Sequelize.Model<
      DepositAndBonusInterface,
      Partial<InputDepositAndBonusInterface>
    >,
    DepositAndBonusInterface {}
