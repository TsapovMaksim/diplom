import { Request, Response } from "express";
import {
  createUserBodySchema,
  loginUserBodySchema,
  logoutUserBodySchema,
  refreshUserBodySchema,
} from "./dto/user.dto";
import userService from "./user.service";

class UserController {
  async registration(req: Request, res: Response) {
    const body = await createUserBodySchema.parseAsync(req.body);
    const result = await userService.registration(body);
    res.json(result);
  }
  async login(req: Request, res: Response) {
    const body = await loginUserBodySchema.parseAsync(req.body);
    const result = await userService.login(body);
    res.json(result);
  }

  async logout(req: Request, res: Response) {
    const body = await logoutUserBodySchema.parseAsync(req.body);
    const result = await userService.logout(body);
    res.json(result);
  }

  async refresh(req: Request, res: Response) {
    const body = await refreshUserBodySchema.parseAsync(req.body);
    const result = await userService.refresh(body);
    res.json(result);
  }

  async getAll(req: Request, res: Response) {
    const result = await userService.getAll();
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await userService.deleteUser(id);
    res.json(result);
  }
}

export default new UserController();
