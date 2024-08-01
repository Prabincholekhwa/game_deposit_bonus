import { WhereOptions } from "sequelize";
import { InputUserInterface, UserInterface } from "../interfaces";
import Model from "../models";
import { generateRandomHex } from "../helpers";

export const userRepository = {
  async insert({ ...data }: InputUserInterface): Promise<UserInterface> {
    return await Model.User.create({ id: generateRandomHex(), ...data });
  },

  async findByEmail({
    email,
  }: {
    email: string;
  }): Promise<UserInterface | null> {
    let where: WhereOptions = { email };
    return await Model.User.findOne({ where });
  },

  async findById({
    id,
    includePassword,
  }: {
    id: string;
    includePassword?: boolean;
  }): Promise<UserInterface | null> {
    let attributes = ["id", "email", "fullName", "createdAt", "updatedAt"];
    if (includePassword) {
      attributes.push("password");
    }
    return await Model.User.findByPk(id, { attributes: attributes });
  },

  async update({
    id,
    ...data
  }: { id: string } & Partial<InputUserInterface>): Promise<[number]> {
    return await Model.User.update({ ...data }, { where: { id } });
  },
};
