import { AppDataSource } from "../../data-source";
import FavoriteProduct from "./entities/favorite-product.entity";
import Favorite from "./entities/favorite.entity";

class FavoriteService {
  favoriteRepository;
  favoriteProductRepository;

  constructor() {
    this.favoriteRepository = AppDataSource.getRepository(Favorite);
    this.favoriteProductRepository =
      AppDataSource.getRepository(FavoriteProduct);
  }

  async getFavoriteById({ id }: { id: number }) {
    return await this.favoriteRepository.findOneOrFail({
      where: { id },
      relations: {
        favoriteProducts: {
          product: { preview: true, category: { category: true } },
        },
      },
      select: {
        id: true,
        favoriteProducts: {
          id: true,
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

  async createFavorite({ userId }: { userId: number }) {
    const favorite = this.favoriteRepository.create({ user: { id: userId } });
    const result = await this.favoriteRepository.save(favorite);
    return result;
  }

  async createFavoriteProduct({
    favoriteId,
    productId,
  }: {
    favoriteId: number;
    productId: number;
  }) {
    const favorite = await this.favoriteRepository.findOneOrFail({
      where: { id: favoriteId },
      relations: { favoriteProducts: true },
    });
    let favoriteProduct = this.favoriteProductRepository.create({
      product: { id: productId },
    });
    favoriteProduct = await this.favoriteProductRepository.save(
      favoriteProduct
    );
    favorite.favoriteProducts.push(favoriteProduct);
    const res = await this.favoriteRepository.save(favorite);
    return res;
  }

  async deleteFavoriteProduct({
    favoriteProductId,
  }: {
    favoriteProductId: number;
  }) {
    return await this.favoriteProductRepository.delete({
      id: favoriteProductId,
    });
  }
}

export default new FavoriteService();
