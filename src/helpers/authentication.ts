import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { UserInterface } from "../interfaces";
import { userRepository } from "../repositories";
import { errorResponseData } from "../utils";
require("dotenv").config();
import { HttpStatusEnum } from "../enums";

require("dotenv").config();

class Authentication {
  private static instance: Authentication;

  static get(): Authentication {
    if (!Authentication.instance) {
      Authentication.instance = new Authentication();
    }
    return Authentication.instance;
  }

  async getAccessToken(
    user_id: string
  ): Promise<{ token: string; expiresIn: string; user: UserInterface | null }> {
    const payload = {
      id: user_id,
    };
    const expiresIn = "12h";
    const pathToPrivateKey = path.join(__dirname, "..", "privateKey.pem");
    const privateKey = fs.readFileSync(pathToPrivateKey, "utf8");
    const signedToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn,
    });
    const user = await userRepository.findById({ id: user_id });
    return {
      token: "Bearer" + signedToken,
      expiresIn,
      user: user,
    };
  }

  async authenticate(
    token: string,
    res: any
  ): Promise<{ user: UserInterface } | any> {
    try {
      const pathToPublicKey = path.join(__dirname, "..", "publicKey.pem");
      const publicKey = fs.readFileSync(pathToPublicKey, "utf8");
      const decoded: JwtPayload = jwt.verify(token, publicKey) as JwtPayload;
      const user = (await userRepository.findById({
        id: decoded.id,
      })) as UserInterface | null;
      if (user) {
        return {
          user,
        };
      }
      throw new Error("Unauthorized");
    } catch (error: any) {
      return errorResponseData({
        message: `${error.message}`,
        res,
        statusCode: HttpStatusEnum.UNAUTHORIZED,
      });
    }
  }
}
const authentication = Authentication.get();
export { authentication as Authentication };
