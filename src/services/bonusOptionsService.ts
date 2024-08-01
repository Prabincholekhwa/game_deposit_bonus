import { bonusOptionRepository } from "../repositories/bonusOptionRepository";

export const bonusOptionService = {
  async find() {
    return await bonusOptionRepository.find();
  },
};
