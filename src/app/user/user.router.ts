import { Router } from "express";
import userController from "./user.controller";
import expressAsyncHandler from "express-async-handler";
import auth from "../../middlewares/auth";

const userRouter = Router();
// refresh

userRouter
  .route("/user")
  .get(expressAsyncHandler(userController.getAll))
  .post(expressAsyncHandler(userController.registration));

userRouter
  .route("/user/:id")
  .delete(expressAsyncHandler(userController.delete));

userRouter.post("/user/login", expressAsyncHandler(userController.login));
userRouter.post("/user/logout", expressAsyncHandler(userController.logout));
userRouter.post("/user/refresh", expressAsyncHandler(userController.refresh));

export default userRouter;
