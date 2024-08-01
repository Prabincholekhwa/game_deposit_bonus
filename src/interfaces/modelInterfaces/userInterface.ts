import * as Sequelize from "sequelize";
import { ModelTimestampExtend } from "../../interfaces";

export interface InputUserInterface {
  id?: string;
  fullName: string;
  email: string;
  password: string;
}

export interface UserInterface extends ModelTimestampExtend {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

export interface UserModelInterface
  extends Sequelize.Model<UserInterface, Partial<InputUserInterface>>,
    UserInterface {}
