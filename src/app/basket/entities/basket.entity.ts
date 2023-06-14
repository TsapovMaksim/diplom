import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "../../user/user.entity";
import BasketProduct from "./basket-product.entity";

@Entity()
class Basket {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.basket, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @OneToMany(() => BasketProduct, (basketProduct) => basketProduct.basket)
  basketProducts: BasketProduct[];
}

export default Basket;
