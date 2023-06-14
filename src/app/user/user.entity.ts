import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Basket from "../basket/entities/basket.entity";
import Favorite from "../favorite/entities/favorite.entity";
import Review from "../review/review.entity";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Basket, (basket) => basket.user)
  basket: Basket;

  @OneToOne(() => Favorite, (favorite) => favorite.user)
  favorite: Favorite;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @Column({ default: false })
  isAdmin: boolean;
}

export default User;
