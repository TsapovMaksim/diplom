import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Filter from "./filter.entity";
import ProductCharacteristic from "../../characteristic/entities/product-characteristic.entity";

@Entity({ name: "filter_value" })
class FilterValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Filter, (filter) => filter.filterValues, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  filter: Filter;

  @OneToOne(() => ProductCharacteristic, { onDelete: "CASCADE" })
  @JoinColumn()
  productCharacteristic: ProductCharacteristic;
}

export default FilterValue;
