import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import favoriteController from "./favorite.controller";

const favoriteRouter = Router();

favoriteRouter
  .route("/favorite/:id")
  .get(expressAsyncHandler(favoriteController.getFavoriteById));
favoriteRouter
  .route("/favorite/:id/favorite-product")
  .post(expressAsyncHandler(favoriteController.createFavoriteProduct));
favoriteRouter
  .route("/favorite/:id/favorite-product/:favorite_product_id")
  .delete(expressAsyncHandler(favoriteController.deleteFavoriteProduct));

export default favoriteRouter;
