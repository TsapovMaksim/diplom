import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Favorite from "./favorite.entity";
import Product from "../../product/product.entity";

@Entity({ name: "favorite_product" })
class FavoriteProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Favorite, (favorite) => favorite.favoriteProducts, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  favorite: Favorite;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;
}

export default FavoriteProduct;
