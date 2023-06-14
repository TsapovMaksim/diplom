import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;
}

export default Image;
