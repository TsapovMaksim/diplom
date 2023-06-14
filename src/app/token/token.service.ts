import { AppDataSource } from "../../data-source";
import userService from "../user/user.service";
import Token from "./token.entity";
import jwt from "jsonwebtoken";

const accessSecretKey = "access-token";
const refreshSecretKey = "access-token";

class TokenService {
  tokenRepository;
  constructor() {
    this.tokenRepository = AppDataSource.getRepository(Token);
  }

  generateTokens<T extends object>(payload: T) {
    const accessToken = jwt.sign(payload, accessSecretKey, {
      expiresIn: "60m",
    });
    const refreshToken = jwt.sign(payload, refreshSecretKey, {
      expiresIn: "30d",
    });

    return { accessToken, refreshToken };
  }

  async saveToken({
    userId,
    refreshToken,
  }: {
    userId: number;
    refreshToken: string;
  }) {
    const token = await this.tokenRepository.findOne({
      where: { user: { id: userId } },
    });
    if (token) {
      token.refreshToken = refreshToken;
      const res = await this.tokenRepository.save(token);
      return res;
    }
    const user = await userService.getById(userId);
    const newToken = this.tokenRepository.create({ user, refreshToken });
    const res = await this.tokenRepository.save(newToken);
    return res;
  }

  async removeToken({ userId }: { userId: number }) {
    const res = await this.tokenRepository.delete({ user: { id: userId } });
    return res;
  }

  validateAccessToken(accessToken: string) {
    try {
      const data = jwt.verify(accessToken, accessSecretKey);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const data = jwt.verify(refreshToken, refreshSecretKey);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async findByToken(refreshToken: string) {
    const token = await this.tokenRepository.findOneOrFail({
      where: { refreshToken },
      relations: { user: { basket: true, favorite: true } },
      select: {
        refreshToken: true,
        user: {
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
      },
    });
    return token;
  }

  async findByUserId(userId: number) {
    const token = await this.tokenRepository.findOneOrFail({
      relations: { user: true },
      where: { user: { id: userId } },
    });
    return token;
  }
}

export default new TokenService();
