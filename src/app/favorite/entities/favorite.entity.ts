import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "../../user/user.entity";
import FavoriteProduct from "./favorite-product.entity";

@Entity()
class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.favorite, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(
    () => FavoriteProduct,
    (favoriteProduct) => favoriteProduct.favorite
  )
  favoriteProducts: FavoriteProduct[];
}

export default Favorite;
