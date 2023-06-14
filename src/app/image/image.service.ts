import { AppDataSource } from "../../data-source";
import getImagePath from "../../utils/get-image-path";
import Image from "./image.entity";

class ImageService {
  imageRepository;
  constructor() {
    this.imageRepository = AppDataSource.getRepository(Image);
  }

  async save(input: { name: string }) {
    const image = this.imageRepository.create({
      name: input.name,
      path: getImagePath(input.name),
    });
    const res = await this.imageRepository.save(image);
    return res;
  }

  async delete(id: number) {
    const res = await this.imageRepository.delete({ id });
    return res;
  }
}

export default new ImageService();
