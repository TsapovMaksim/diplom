import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Basket from "./basket.entity";
import Product from "../../product/product.entity";

@Entity({ name: "basket_product" })
class BasketProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Basket, (basket) => basket.basketProducts, {
    onDelete: "CASCADE",
  })
  basket: Basket;

  @Column({ default: 1 })
  count: number;

  @ManyToOne(() => Product)
  @JoinColumn()
  product: Product;
}

export default BasketProduct;
