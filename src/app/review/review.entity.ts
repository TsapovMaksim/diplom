import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Product from "../product/product.entity";
import User from "../user/user.entity";

@Entity()
class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  star: number;

  @Column()
  text: string;

  @Column({ type: "timestamp" })
  date: Date;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  product: Product;
}

export default Review;
