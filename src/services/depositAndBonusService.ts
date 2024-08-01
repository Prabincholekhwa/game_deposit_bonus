import { BonusOptionEnum } from "../enums/modelEnums";
import { InputDepositAndBonusInterface } from "../interfaces";
import { depositRepository } from "../repositories";
import { bonusOptionRepository } from "../repositories/bonusOptionRepository";

export const depositAndBonusService = {
  async create({
    ...data
  }: Omit<InputDepositAndBonusInterface, "id" | "totalAmountWithBonus">) {
    const BonusOptionData = await bonusOptionRepository.findById({
      id: data.bonusOptionId,
    });
    if (BonusOptionData?.bonusType === BonusOptionEnum.custom) {
      let amountWithBonus = 0;
      let percent = BonusOptionData.bonusPercent
        ? BonusOptionData.bonusPercent
        : 0;
      amountWithBonus =
        (+percent / 100) * +data.depositAmount + +data.depositAmount;

      return await depositRepository.insert({
        depositAmount: data.depositAmount,
        bonusOptionId: data.bonusOptionId,
        userId: data.userId,
        totalAmountWithBonus: amountWithBonus.toString(),
      });
    }
    if (BonusOptionData?.bonusType == BonusOptionEnum.fixed10) {
      return await depositRepository.insert({
        depositAmount: data.depositAmount,
        bonusOptionId: data.bonusOptionId,
        userId: data.userId,
        totalAmountWithBonus: (
          0.1 * +data.depositAmount +
          +data.depositAmount
        ).toString(),
      });
    }
  },

  async update({
    id,
    ...data
  }: Omit<
    InputDepositAndBonusInterface,
    "bonusOptionId" | "userId" | "totalAmountWithBonus"
  > & {
    id: string;
  }) {
    let amountWithBonus = 0;
    const depositData = await depositRepository.findById({ id });

    if (!depositData) {
      throw new Error("Deposit And Bonus Data Not Found");
    }
    const BonusOptionData = await bonusOptionRepository.findById({
      id: depositData?.bonusOptionId,
    });
    if (BonusOptionData?.bonusType === BonusOptionEnum.custom) {
      let percent = BonusOptionData.bonusPercent
        ? BonusOptionData.bonusPercent
        : 0;
      amountWithBonus =
        (+percent / 100) * +data.depositAmount + +data.depositAmount;
      return await depositRepository.update({
        id,
        depositAmount: depositData.depositAmount + data.depositAmount,
        totalAmountWithBonus: (
          +depositData.totalAmountWithBonus + amountWithBonus
        ).toString(),
      });
    }
    if (BonusOptionData?.bonusType === BonusOptionEnum.fixed10) {
      return await depositRepository.update({
        id,
        depositAmount: depositData.depositAmount + data.depositAmount,
        totalAmountWithBonus: (
          +depositData.totalAmountWithBonus +
          (+data.depositAmount * 0.1 + +data.depositAmount)
        ).toString(),
      });
    }
  },

  async find({
    userId,
    bonusOptionId,
  }: {
    userId: string;
    bonusOptionId?: string;
  }) {
    return await depositRepository.find({ userId, bonusOptionId });
  },

  async findById({ id }: { id: string }) {
    return await depositRepository.findById({ id });
  },
};
