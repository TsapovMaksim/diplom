import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import ProductCategory from "../../category/entities/product-category.entity";
import Characteristic from "../../characteristic/entities/characteristic.entity";
import FilterValue from "./filter-value.entity";

@Entity()
class Filter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.filters,
    { onDelete: "CASCADE" }
  )
  @JoinColumn()
  productCategory: ProductCategory;

  @OneToOne(() => Characteristic)
  @JoinColumn()
  characteristic: Characteristic;

  @OneToMany(() => FilterValue, (filterValue) => filterValue.filter)
  filterValues: FilterValue[];
}

export default Filter;
