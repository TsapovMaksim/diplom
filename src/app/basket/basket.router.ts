import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import basketController from "./basket.controller";

const basketRouter = Router();

basketRouter
  .route("/basket")
  .get(expressAsyncHandler(basketController.getBasket));
basketRouter
  .route("/basket/user/:id")
  .get(expressAsyncHandler(basketController.getBasketByUserId));

basketRouter
  .route("/basket/:id")
  .get(expressAsyncHandler(basketController.getBasketById));
basketRouter
  .route("/basket/:id/clear")
  .post(expressAsyncHandler(basketController.clearBasket));

basketRouter
  .route("/basket/:id/product")
  .post(expressAsyncHandler(basketController.createBasketProduct));

basketRouter
  .route("/basket/:id/product/:basket_product_id")
  .delete(expressAsyncHandler(basketController.deleteBasketProduct));

basketRouter
  .route("/basket/:id/product/add")
  .post(expressAsyncHandler(basketController.addBasketProduct));
basketRouter
  .route("/basket/:id/product/remove")
  .post(expressAsyncHandler(basketController.removeBasketProduct));

export default basketRouter;
