import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Compare from "./compare.entity";
import Product from "../../product/product.entity";

@Entity({ name: "compare_product" })
class CompareProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Compare, (compare) => compare.compareProducts)
  @JoinColumn()
  compare: Compare;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;
}

export default CompareProduct;
