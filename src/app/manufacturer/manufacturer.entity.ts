import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Product from "../product/product.entity";
import ProductCategory from "../category/entities/product-category.entity";

@Entity()
class Manufacturer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @OneToMany(() => Product, (product) => product.manufacturer)
  products: Product[];

  @ManyToMany(
    () => ProductCategory,
    (productCategory) => productCategory.manufacturers
  )
  productCategories: ProductCategory[];
}

export default Manufacturer;
