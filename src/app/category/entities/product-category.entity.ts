import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./category.entity";
import Manufacturer from "../../manufacturer/manufacturer.entity";
import Product from "../../product/product.entity";
import Filter from "../../filter/entities/filter.entity";
import CharacteristicType from "../../characteristic/entities/characteristic-type.entity";

@Entity({ name: "product_category" })
class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @ManyToOne(() => Category, (category) => category.productCategories, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  category: Category;

  @ManyToMany(
    () => Manufacturer,
    (manufacturer) => manufacturer.productCategories
  )
  @JoinTable()
  manufacturers: Manufacturer[];

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => Filter, (filter) => filter.productCategory)
  filters: Filter[];

  @OneToMany(
    () => CharacteristicType,
    (characteristicType) => characteristicType.productCategory
  )
  characteristicTypes: CharacteristicType[];
}

export default ProductCategory;
