import { IncludeOptions, WhereOptions } from "sequelize";
import {
  InputDepositAndBonusInterface,
  DepositAndBonusInterface,
} from "../interfaces";
import Model from "../models";
import { generateRandomHex } from "../helpers";

export const depositRepository = {
  async insert({
    ...data
  }: InputDepositAndBonusInterface): Promise<DepositAndBonusInterface> {
    return await Model.DepositAndBonus.create({
      id: generateRandomHex(),
      ...data,
    });
  },

  async findById({
    id,
  }: {
    id: string;
  }): Promise<DepositAndBonusInterface | null> {
    let include: IncludeOptions[] = [
      {
        model: Model.BonusOption,
        as: "bonusOption",
      },
    ];
    return await Model.DepositAndBonus.findByPk(id, { include });
  },

  async update({
    id,
    ...data
  }: { id: string } & Omit<
    Partial<InputDepositAndBonusInterface>,
    "userId" | "bonusOptionId"
  >): Promise<DepositAndBonusInterface | null> {
    await Model.DepositAndBonus.update({ ...data }, { where: { id } });
    return await this.findById({ id });
  },

  async find({
    ...data
  }: Omit<
    Partial<InputDepositAndBonusInterface>,
    "depositAmount" | "totalAmountWithBonus"
  >) {
    let include: IncludeOptions[] = [
      {
        model: Model.BonusOption,
        as: "bonusOption",
      },
    ];
    let where: WhereOptions = {};
    if (data.bonusOptionId) where.bonusOptionId = data.bonusOptionId;
    if (data.userId) where.userId = data.userId;
    return await Model.DepositAndBonus.findAndCountAll({ where, include });
  },
};
