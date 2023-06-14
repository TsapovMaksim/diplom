import { Request, Response } from "express";
import { createBasketProductBodySchema } from "../basket/dto/basket-product.dto";
import favoriteService from "./favorite.service";

class FavoriteController {
  async getFavoriteById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await favoriteService.getFavoriteById({ id });
    res.json(result);
  }

  async createFavoriteProduct(req: Request, res: Response) {
    const favoriteId = Number(req.params.id);
    const body = await createBasketProductBodySchema.parseAsync(req.body);
    const result = await favoriteService.createFavoriteProduct({
      favoriteId,
      productId: body.productId,
    });
    res.json(result);
  }

  async deleteFavoriteProduct(req: Request, res: Response) {
    const favoriteProductId = Number(req.params.favorite_product_id);
    const result = await favoriteService.deleteFavoriteProduct({
      favoriteProductId,
    });

    res.json(result);
  }
}

export default new FavoriteController();
