import { omit, pick } from "lodash";
import { AppDataSource } from "../../data-source";
import tokenService from "../token/token.service";
import {
  CreateUserInput,
  LoginUserInput,
  LogoutUserInput,
  RefreshUserInput,
} from "./dto/user.dto";
import User from "./user.entity";
import bcrypt from "bcrypt";
import basketService from "../basket/basket.service";
import favoriteService from "../favorite/favorite.service";

class UserService {
  userRepository;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async getById(id: number) {
    const user = await this.userRepository.findOneByOrFail({ id });
    return user;
  }

  async registration(input: CreateUserInput) {
    const user = await this.userRepository.findOneBy({ email: input.email });
    if (user) {
      throw new Error(`Пользователь с email ${input.email} уже существует`);
    }
    const hashedPassword = await bcrypt.hash(input.password, 3);
    const newUser = this.userRepository.create({
      ...input,
      password: hashedPassword,
    });
    const res = await this.userRepository.save(newUser);
    const returnedUser = pick(res, [
      "id",
      "name",
      "surname",
      "email",
      "isAdmin",
    ]);
    const tokens = tokenService.generateTokens(returnedUser);
    await tokenService.saveToken({
      refreshToken: tokens.refreshToken,
      userId: res.id,
    });
    await basketService.createBasket({ userId: res.id });
    await favoriteService.createFavorite({ userId: res.id });
    return { user: returnedUser, ...tokens };
  }

  async login(input: LoginUserInput) {
    const user = await this.userRepository.findOneOrFail({
      where: { email: input.email },
      relations: {
        basket: true,
        favorite: true,
      },
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        isAdmin: true,
        password: true,
        basket: {
          id: true,
        },
        favorite: {
          id: true,
        },
      },
    });
    const isSamePassword = await bcrypt.compare(input.password, user.password);
    if (!isSamePassword) {
      throw new Error("Неверное имя пользователя или пароль");
    }
    const returnedUser = omit(user, ["password"]);
    const tokens = tokenService.generateTokens(returnedUser);
    await tokenService.saveToken({
      userId: user.id,
      refreshToken: tokens.refreshToken,
    });
    return { user: returnedUser, ...tokens };
  }

  async logout(input: LogoutUserInput) {
    return await tokenService.removeToken(input);
  }

  async refresh(input: RefreshUserInput) {
    const token = await tokenService.findByToken(input.refreshToken);
    const user = tokenService.validateRefreshToken(token.refreshToken);
    if (!user || !token) {
      throw new Error("unauthorized");
    }
    const returnedUser = token.user;
    const tokens = tokenService.generateTokens(returnedUser);
    await tokenService.saveToken({
      userId: token.user.id,
      refreshToken: tokens.refreshToken,
    });
    return { user: returnedUser, ...tokens };
  }

  async getAll() {
    return await this.userRepository.find({
      relations: { basket: true, favorite: true },
    });
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete({ id });
  }
}

export default new UserService();
