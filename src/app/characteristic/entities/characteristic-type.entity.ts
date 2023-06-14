import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Characteristic from "./characteristic.entity";
import ProductCategory from "../../category/entities/product-category.entity";

@Entity({ name: "characteristic_type" })
class CharacteristicType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(
    () => Characteristic,
    (characteristic) => characteristic.characteristicType
  )
  characteristics: Characteristic[];

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.characteristicTypes,
    { onDelete: "CASCADE" }
  )
  @JoinColumn()
  productCategory: ProductCategory;
}

export default CharacteristicType;
