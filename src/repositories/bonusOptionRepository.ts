import { BonusOptionsInterface } from "../interfaces";
import Model from "../models";

export const bonusOptionRepository = {
  async findById({
    id,
  }: {
    id?: string;
  }): Promise<BonusOptionsInterface | null> {
    return await Model.BonusOption.findByPk(id);
  },

  async find(): Promise<{ count: number; rows: BonusOptionsInterface[] }> {
    return await Model.BonusOption.findAndCountAll();
  },
};
