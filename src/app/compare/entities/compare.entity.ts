import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "../../user/user.entity";
import CompareProduct from "./compare-product.entity";

@Entity()
class Compare {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.favorite)
  @JoinColumn()
  user: User;

  @OneToMany(() => CompareProduct, (compareProduct) => compareProduct.compare)
  compareProducts: CompareProduct[];
}

export default Compare;
