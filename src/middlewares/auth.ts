import { NextFunction, Request, Response } from "express";
import tokenService from "../app/token/token.service";
import { RequestWithUser } from "../types";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new Error("unauthorized"));
  }
  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    return next(new Error("unauthorized"));
  }
  const userData = tokenService.validateAccessToken(accessToken);
  if (!userData) {
    return next(new Error("unauthorized"));
  }
  (req as RequestWithUser).user = userData;
  next();
};

export default auth;
