import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import parseUrl from "../../utils/parse-url";
import {
  createCharacteristicTypeBodySchema,
  getCharacteristicTypesParamsSchema,
  updateCharacteristicTypeBodySchema,
} from "./dto/characteristic-type.dto";
import CharacteristicType from "./entities/characteristic-type.entity";
import ProductCategory from "../category/entities/product-category.entity";
import Characteristic from "./entities/characteristic.entity";
import {
  createCharacteristicBodySchema,
  getCharacteristicParamsSchema,
  updateCharacteristicBodySchema,
} from "./dto/characteristic.dto";
import ProductCharacteristic from "./entities/product-characteristic.entity";
import {
  createProductCharacteristicBodySchema,
  getProductCharacteristicParamsSchema,
  updateProductCharacteristicBodySchema,
} from "./dto/product-characteristic.dto";

class CharacteristictsController {
  private characteristicTypeRepository;
  private characteristicRepository;
  private productCategoryRepository;
  private productCharacteristicRepository;

  constructor() {
    this.characteristicTypeRepository =
      AppDataSource.getRepository(CharacteristicType);
    this.characteristicRepository = AppDataSource.getRepository(Characteristic);
    this.productCharacteristicRepository = AppDataSource.getRepository(
      ProductCharacteristic
    );
    this.productCategoryRepository =
      AppDataSource.getRepository(ProductCategory);
  }

  async getCharacteristicTypes(req: Request, res: Response) {
    const queryParams = await getCharacteristicTypesParamsSchema.parseAsync(
      parseUrl(req.url).query
    );
    const result = await this.characteristicTypeRepository.find({
      where: { productCategory: { id: queryParams.categoryId } },
    });
    res.json(result);
  }

  async createCharacteristicType(req: Request, res: Response) {
    const body = await createCharacteristicTypeBodySchema.parseAsync(req.body);
    const characteristicType = this.characteristicTypeRepository.create(body);
    characteristicType.productCategory =
      await this.productCategoryRepository.findOneByOrFail({
        id: body.categoryId,
      });
    const result = await this.characteristicTypeRepository.save(
      characteristicType
    );
    res.json(result);
  }

  async updateCharacteristicType(req: Request, res: Response) {
    const body = await updateCharacteristicTypeBodySchema.parseAsync(req.body);
    const characteristicType =
      await this.characteristicTypeRepository.findOneByOrFail({
        id: Number(req.params.id),
      });
    this.characteristicTypeRepository.merge(characteristicType, body);
    const result = await this.characteristicTypeRepository.save(
      characteristicType
    );
    res.json(result);
  }

  async getCharacteristicTypeById(req: Request, res: Response) {
    const characteristicType =
      await this.characteristicTypeRepository.findOneByOrFail({
        id: Number(req.params.id),
      });
    res.json(characteristicType);
  }

  async deleteCharacteristicType(req: Request, res: Response) {
    const characteristicType = await this.characteristicTypeRepository.delete({
      id: Number(req.params.id),
    });
    res.json(characteristicType);
  }

  async getCharacteristics(req: Request, res: Response) {
    const queryParams = await getCharacteristicParamsSchema.parseAsync(
      parseUrl(req.url).query
    );
    const characteristicts = await this.characteristicRepository.find({
      where: { characteristicType: { id: queryParams.typeId } },
    });
    res.json(characteristicts);
  }

  async getCharacteristicById(req: Request, res: Response) {
    const characteristict = await this.characteristicRepository.findOneOrFail({
      where: { id: Number(req.params.id) },
      relations: { productCharacteristics: true },
    });
    res.json(characteristict);
  }

  async createCharacteristics(req: Request, res: Response) {
    const body = await createCharacteristicBodySchema.parseAsync(req.body);
    const characteristict = this.characteristicRepository.create(body);
    characteristict.characteristicType =
      await this.characteristicTypeRepository.findOneByOrFail({
        id: body.typeId,
      });
    const result = await this.characteristicRepository.save(characteristict);
    res.json(result);
  }

  async updateCharacteristic(req: Request, res: Response) {
    const body = await updateCharacteristicBodySchema.parseAsync(req.body);
    const characteristict = await this.characteristicRepository.findOneByOrFail(
      {
        id: Number(req.params.id),
      }
    );
    this.characteristicRepository.merge(characteristict, body);
    const result = await this.characteristicRepository.save(characteristict);
    res.json(result);
  }

  async deleteCharacteristic(req: Request, res: Response) {
    const result = await this.characteristicRepository.delete({
      id: Number(req.params.id),
    });
    res.json(result);
  }

  async getProductCharacteristics(req: Request, res: Response) {
    const queryParams = await getProductCharacteristicParamsSchema.parseAsync(
      parseUrl(req.url).query
    );
    const productCharacteristicts =
      await this.productCharacteristicRepository.find({
        where: { characteristic: { id: queryParams.characteristicId } },
        relations: {
          characteristic: true,
        },
      });
    res.json(productCharacteristicts);
  }

  async getProductCharacteristicById(req: Request, res: Response) {
    const characteristict =
      await this.productCharacteristicRepository.findOneByOrFail({
        id: Number(req.params.id),
      });
    res.json(characteristict);
  }

  async createProductCharacteristics(req: Request, res: Response) {
    const body = await createProductCharacteristicBodySchema.parseAsync(
      req.body
    );
    const productCharacteristict =
      this.productCharacteristicRepository.create(body);
    productCharacteristict.characteristic =
      await this.characteristicRepository.findOneByOrFail({
        id: body.characteristicId,
      });
    const result = await this.productCharacteristicRepository.save(
      productCharacteristict
    );
    res.json(result);
  }

  async updateProductCharacteristic(req: Request, res: Response) {
    const body = await updateProductCharacteristicBodySchema.parseAsync(
      req.body
    );
    const productCharacteristict =
      await this.productCharacteristicRepository.findOneByOrFail({
        id: Number(req.params.id),
      });
    this.productCharacteristicRepository.merge(productCharacteristict, body);
    const result = await this.productCharacteristicRepository.save(
      productCharacteristict
    );
    res.json(result);
  }

  async deleteProductCharacteristic(req: Request, res: Response) {
    const result = await this.productCharacteristicRepository.delete({
      id: Number(req.params.id),
    });
    res.json(result);
  }
}

export default new CharacteristictsController();
