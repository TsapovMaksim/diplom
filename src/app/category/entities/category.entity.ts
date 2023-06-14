import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ProductCategory from "./product-category.entity";

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category
  )
  productCategories: ProductCategory[];
}

export default Category;
