import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import ProductCharacteristic from "./product-characteristic.entity";
import CharacteristicType from "./characteristic-type.entity";

@Entity()
class Characteristic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(
    () => ProductCharacteristic,
    (productCharacteristic) => productCharacteristic.characteristic
  )
  productCharacteristics: ProductCharacteristic[];

  @ManyToOne(
    () => CharacteristicType,
    (characteristicType) => characteristicType.characteristics,
    { onDelete: "CASCADE" }
  )
  @JoinColumn()
  characteristicType: CharacteristicType;
}

export default Characteristic;
