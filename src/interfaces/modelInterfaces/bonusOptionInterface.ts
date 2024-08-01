import * as Sequelize from "sequelize";
import { ModelTimestampExtend } from "../../interfaces";
import { BonusOptionEnum } from "../../enums/modelEnums";

export interface InputBonusOptionsInterface {
  id?: string;
  bonusType: BonusOptionEnum;
  bonusPercent?: string;
}

export interface BonusOptionsInterface extends ModelTimestampExtend {
  id: string;
  bonusType: BonusOptionEnum;
  bonusPercent?: string;
}

export interface BonusOptionModelInterface
  extends Sequelize.Model<
      BonusOptionsInterface,
      Partial<InputBonusOptionsInterface>
    >,
    BonusOptionsInterface {}
