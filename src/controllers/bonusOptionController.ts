import { Request, Response } from "express";
import { HttpStatusEnum } from "../enums";
import { bonusOptionService } from "../services/bonusOptionsService";
import { successResponseData, errorResponseData } from "../utils";

export const bonusOptionController = {
  async find(req: Request, res: Response) {
    try {
      const data = await bonusOptionService.find();
      return successResponseData({
        data,
        message: "Bonus Options fetched successfully.",
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
