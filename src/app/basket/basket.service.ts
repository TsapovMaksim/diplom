import { AppDataSource } from "../../data-source";
import Product from "../product/product.entity";
import { CreateBasketProductInput } from "./dto/basket-product.dto";
import { GetBasketInput } from "./dto/basket.dto";
import BasketProduct from "./entities/basket-product.entity";
import Basket from "./entities/basket.entity";

class BasketService {
  basketRepository;
  basketProductRepository;
  productRepository;

  constructor() {
    this.basketRepository = AppDataSource.getRepository(Basket);
    this.basketProductRepository = AppDataSource.getRepository(BasketProduct);
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async getBasket(input: GetBasketInput) {
    return await this.basketRepository.find({
      where: { user: { id: input.userId } },
      relations: { basketProducts: true },
    });
  }

  async createBasket({ userId }: { userId: number }) {
    const basket = this.basketRepository.create({ user: { id: userId } });
    const res = await this.basketRepository.save(basket);
    return res;
  }

  async getBasketById(id: number) {
    return await this.basketRepository.findOneOrFail({
      where: { id },
      relations: { basketProducts: { product: { preview: true } } },
      select: {
        id: true,
        basketProducts: {
          id: true,
          count: true,
          product: {
            title: true,
            price: true,
            preview: {
              path: true,
            },
          },
        },
      },
    });
  }

  async getBasketByUserId(id: number) {
    return await this.basketRepository.findOneOrFail({
      where: { user: { id } },
      relations: {
        basketProducts: {
          product: { preview: true, category: { category: true } },
        },
      },
      select: {
        id: true,
        basketProducts: {
          id: true,
          count: true,
          product: {
            id: true,
            title: true,
            price: true,
            raiting: true,
            reviewsCount: true,
            preview: {
              path: true,
            },
            category: {
              id: true,
              category: {
                id: true,
              },
            },
          },
        },
      },
    });
  }

  async addBasketProduct({ basketProductId }: { basketProductId: number }) {
    const basketProduct = await this.basketProductRepository.findOneByOrFail({
      id: basketProductId,
    });
    basketProduct.count++;
    return await this.basketProductRepository.save(basketProduct);
  }

  async removeBasketProduct({ basketProductId }: { basketProductId: number }) {
    const basketProduct = await this.basketProductRepository.findOneByOrFail({
      id: basketProductId,
    });
    if (basketProduct.count > 1) {
      basketProduct.count--;
      return await this.basketProductRepository.save(basketProduct);
    }
    return await this.basketProductRepository.delete({ id: basketProductId });
  }

  async getBasketWithProductsById(id: number) {
    return await this.basketRepository.find({
      where: { id },
      relations: { basketProducts: true },
    });
  }

  async createBasketProduct(
    input: CreateBasketProductInput & { basketId: number }
  ) {
    const basket = await this.basketRepository.findOneByOrFail({
      id: input.basketId,
    });
    const product = await this.productRepository.findOneByOrFail({
      id: input.productId,
    });
    const basketProduct = this.basketProductRepository.create({
      basket,
      count: 1,
      product,
    });
    const res = await this.basketProductRepository.save(basketProduct);
    return res;
  }

  async deleteBasketProduct(input: { basketProductId: number }) {
    return await this.basketProductRepository.delete({
      id: input.basketProductId,
    });
  }

  async clearBasket(input: { id: number }) {
    const basket = await this.basketRepository.findOneOrFail({
      where: { id: input.id },
      relations: { basketProducts: true },
    });
    basket.basketProducts = [];
    const res = await this.basketRepository.save(basket);
    return res;
  }
}

export default new BasketService();
