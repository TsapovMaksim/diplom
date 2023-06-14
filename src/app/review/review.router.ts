import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import reviewController from "./review.controller";

const reviewRouter = Router();

reviewRouter
  .route("/review")
  .get(expressAsyncHandler(reviewController.getAll.bind(reviewController)))
  .post(expressAsyncHandler(reviewController.create.bind(reviewController)));

reviewRouter
  .route("/review/:id")
  .delete(expressAsyncHandler(reviewController.delete.bind(reviewController)));

export default reviewRouter;
