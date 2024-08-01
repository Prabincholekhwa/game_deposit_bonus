import { userRepository } from "../repositories";
import { InputUserInterface } from "../interfaces";
import { Authentication, Password } from "../helpers";
export const userService = {
  async create({ ...data }: InputUserInterface) {
    const userExist = await userRepository.findByEmail({ email: data.email });
    if (userExist) {
      throw new Error("Email Already Used");
    }
    const hashedPassword = await Password.generateSaltHashBcrypt(data.password);
    await userRepository.insert({
      email: data.email,
      fullName: data.fullName,
      password: hashedPassword,
    });

    return await this.login({ email: data.email, password: data.password });
  },

  async login({ ...data }: Omit<InputUserInterface, "fullName">) {
    const userExist = await userRepository.findByEmail({
      email: data.email,
    });
    if (!userExist) throw new Error("Invalid Email");
    const isPasswordMatched = await Password.verifyPasswordBcrypt(
      data.password,
      userExist.password
    );
    if (isPasswordMatched) {
      return await Authentication.getAccessToken(userExist.id);
    }
    throw new Error("Invalid Password");
  },

  async getProfile({ id }: { id: string }) {
    return await userRepository.findById({ id });
  },
};
