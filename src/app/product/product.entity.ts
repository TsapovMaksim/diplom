import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import ProductCategory from "../category/entities/product-category.entity";
import ProductCharacteristic from "../characteristic/entities/product-characteristic.entity";
import Manufacturer from "../manufacturer/manufacturer.entity";
import Review from "../review/review.entity";
import Image from "../image/image.entity";

@Entity()
class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  short_description: string;

  @Column({ type: "float", default: 0 })
  price: number;

  @Column({ type: "float", default: 0 })
  raiting: number;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  @JoinColumn()
  category: ProductCategory;

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.products)
  manufacturer: Manufacturer;

  @OneToOne(() => Image)
  @JoinColumn()
  preview: Image;

  @ManyToMany(
    () => ProductCharacteristic,
    (productCharacteristic) => productCharacteristic.product,
    { onDelete: "CASCADE" }
  )
  characteristics: ProductCharacteristic[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @Column({ default: 0 })
  reviewsCount: number;

  @ManyToMany(() => Image, { onDelete: "CASCADE" })
  @JoinTable()
  images: Image[];
}

export default Product;
