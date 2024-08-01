import { Request, Response } from "express";
import { HttpStatusEnum } from "../enums";
import { depositAndBonusService } from "../services/depositAndBonusService";
import { successResponseData, errorResponseData } from "../utils";
import { InputDepositAndBonusInterface } from "../interfaces";

export const depositController = {
  async create(
    req: Request<
      {},
      {},
      Omit<
        InputDepositAndBonusInterface,
        "userId" | "id" | "totalAmountWithBonus"
      >
    >,
    res: Response
  ): Promise<void> {
    try {
      const { bonusOptionId, depositAmount } = req.body;
      const userId = req.authData.user.id;
      const data = await depositAndBonusService.create({
        bonusOptionId,
        depositAmount,
        userId,
      });

      return successResponseData({
        data,
        message: "Deposit created successfully.",
        statusCode: HttpStatusEnum.CREATED,
        res,
      });
    } catch (err) {
      return errorResponseData({
        message: `${err}`,
        res,
      });
    }
  },

  async update(
    req: Request<
      { id: string },
      {},
      Omit<
        InputDepositAndBonusInterface,
        "userId" | "bonusOptionId" | "totalAmountWithBonus" | "id"
      >
    >,
    res: Response
  ): Promise<void> {
    try {
      const { depositAmount } = req.body;
      const id = req.params.id;
      const data = await depositAndBonusService.update({ depositAmount, id });

      return successResponseData({
        message: "Successful Deposit Updated",
        res,
        data,
      });
    } catch (err) {
      return errorResponseData({
        message: `${err}`,
        res,
      });
    }
  },

  async findByPk(req: Request<{ id: string }, {}, {}>, res: Response) {
    try {
      const data = await depositAndBonusService.findById({ id: req.params.id });
      return successResponseData({
        data,
        message: "Deposit fetched successfully.",
        statusCode: HttpStatusEnum.OK,
        res,
      });
    } catch (err) {
      return errorResponseData({
        message: `${err}`,
        res,
      });
    }
  },

  async find(
    req: Request<
      {},
      {},
      {},
      Omit<
        InputDepositAndBonusInterface,
        "id" | "depositAmount" | "totalAmountWithBonus" | "userId"
      >
    >,
    res: Response
  ) {
    try {
      const userId = req.authData.user.id;
      const { bonusOptionId } = req.query;
      const data = await depositAndBonusService.find({ userId, bonusOptionId });
      return successResponseData({
        data,
        message: "Deposits fetched successfully.",
        statusCode: HttpStatusEnum.OK,
        res,
      });
    } catch (err) {
      return errorResponseData({
        message: `${err}`,
        res,
      });
    }
  },
};
