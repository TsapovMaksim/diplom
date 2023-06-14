import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Product from "../../product/product.entity";
import Characteristic from "./characteristic.entity";

@Entity({ name: "product_characteristic" })
class ProductCharacteristic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToMany(() => Product, (product) => product.characteristics, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  product: Product[];

  @ManyToOne(
    () => Characteristic,
    (characteristic) => characteristic.productCharacteristics,
    { onDelete: "CASCADE" }
  )
  @JoinColumn()
  characteristic: Characteristic;
}

export default ProductCharacteristic;
