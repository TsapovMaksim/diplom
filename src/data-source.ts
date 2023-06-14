import "reflect-metadata";
import { DataSource } from "typeorm";
import Category from "./app/category/entities/category.entity";
import Product from "./app/product/product.entity";
import Manufacturer from "./app/manufacturer/manufacturer.entity";
import ProductCharacteristic from "./app/characteristic/entities/product-characteristic.entity";
import Characteristic from "./app/characteristic/entities/characteristic.entity";
import CharacteristicType from "./app/characteristic/entities/characteristic-type.entity";
import User from "./app/user/user.entity";
import Basket from "./app/basket/entities/basket.entity";
import BasketProduct from "./app/basket/entities/basket-product.entity";
import Compare from "./app/compare/entities/compare.entity";
import CompareProduct from "./app/compare/entities/compare-product.entity";
import Favorite from "./app/favorite/entities/favorite.entity";
import FavoriteProduct from "./app/favorite/entities/favorite-product.entity";
import Review from "./app/review/review.entity";
import ProductCategory from "./app/category/entities/product-category.entity";
import Filter from "./app/filter/entities/filter.entity";
import FilterValue from "./app/filter/entities/filter-value.entity";
import Token from "./app/token/token.entity";
import Image from "./app/image/image.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST || "localhost",
  port: Number(process.env.PORT) || 5051,
  username: process.env.USERNAME || "postgres",
  password: process.env.PASSWORD || "postgres",
  database: process.env.DATABASE || "postgres",
  synchronize: true,
  logging: false,
  entities: [
    Category,
    Product,
    Manufacturer,
    ProductCharacteristic,
    Characteristic,
    CharacteristicType,
    User,
    Basket,
    BasketProduct,
    // Compare,
    // CompareProduct,
    Favorite,
    FavoriteProduct,
    Review,
    ProductCategory,
    Filter,
    FilterValue,
    Token,
    Image,
  ],
  migrations: [],
  subscribers: [],
});
