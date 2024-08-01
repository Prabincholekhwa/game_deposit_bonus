import { Request, Response } from "express";
import { HttpStatusEnum } from "../enums";
import { userService } from "../services";
import { successResponseData, errorResponseData } from "../utils";
import { InputUserInterface } from "../interfaces";

export const userController = {
  async create(
    req: Request<{}, {}, InputUserInterface>,
    res: Response
  ): Promise<void> {
    try {
      const { email, fullName, password } = req.body;
      const data = await userService.create({ email, fullName, password });

      return successResponseData({
        data,
        message: "User is created successfully.",
        statusCode: HttpStatusEnum.CREATED,
        res,
      });
    } catch (err) {
      return errorResponseData({
        message: `User registration failed! ${err}`,
        res,
      });
    }
  },

  async login(
    req: Request<{}, {}, Omit<InputUserInterface, "fullName">>,
    res: Response
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const userData = await userService.login({ email, password });
      return successResponseData({
        message: "Successful Login",
        res,
        data: userData,
      });
    } catch (err) {
      return errorResponseData({
        message: `${err}`,
        res,
      });
    }
  },

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.authData.user.id;
      const data = await userService.getProfile({ id: userId });
      return successResponseData({
        data,
        message: "User profile fetched successfully.",
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
