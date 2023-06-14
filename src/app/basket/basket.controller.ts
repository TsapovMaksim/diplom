import { Request, Response } from "express";
import { getBasketQueryParamsSchema } from "./dto/basket.dto";
import parseUrl from "../../utils/parse-url";
import basketService from "./basket.service";
import {
  addBasketProductBodySchema,
  createBasketProductBodySchema,
  removeBasketProductBodySchema,
} from "./dto/basket-product.dto";

class BasketController {
  async getBasket(req: Request, res: Response) {
    const query = await getBasketQueryParamsSchema.parseAsync(
      parseUrl(req.url).query
    );
    const result = await basketService.getBasket(query);
    res.json(result);
  }

  async getBasketById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const result = await basketService.getBasketById(id);
    res.json(result);
  }

  async getBasketByUserId(req: Request, res: Response) {
    const id = Number(req.params.id);

    const result = await basketService.getBasketByUserId(id);
    res.json(result);
  }

  async addBasketProduct(req: Request, res: Response) {
    const body = await addBasketProductBodySchema.parseAsync(req.body);

    const result = await basketService.addBasketProduct({
      basketProductId: body.basketProductId,
    });
    res.json(result);
  }

  async removeBasketProduct(req: Request, res: Response) {
    const body = await removeBasketProductBodySchema.parseAsync(req.body);

    const result = await basketService.removeBasketProduct({
      basketProductId: body.basketProductId,
    });
    res.json(result);
  }

  async createBasketProduct(req: Request, res: Response) {
    const body = await createBasketProductBodySchema.parseAsync(req.body);
    const basketId = Number(req.params.id);

    const result = await basketService.createBasketProduct({
      basketId,
      productId: body.productId,
    });
    res.json(result);
  }

  async deleteBasketProduct(req: Request, res: Response) {
    const basketProductId = Number(req.params.basket_product_id);

    const result = await basketService.deleteBasketProduct({
      basketProductId,
    });
    res.json(result);
  }

  async clearBasket(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await basketService.clearBasket({ id });
    res.json(result);
  }
}

export default new BasketController();
