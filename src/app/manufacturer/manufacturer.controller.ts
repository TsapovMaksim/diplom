import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import Manufacturer from "./manufacturer.entity";
import {
  addCategoryToManufacturerBodyDTO,
  createManufacturerBodySchema,
  getManufacturersParamsDTO,
  updateManufacturerBodySchema,
} from "./dto/manufacturer.dto";
import ProductCategory from "../category/entities/product-category.entity";
import { FindOptionsWhere } from "typeorm";
import parseUrl from "../../utils/parse-url";

class ManufacturerController {
  manufacturerRepository;
  productCategoryRepository;

  constructor() {
    this.manufacturerRepository = AppDataSource.getRepository(Manufacturer);
    this.productCategoryRepository =
      AppDataSource.getRepository(ProductCategory);
  }

  async getManufacturers(req: Request, res: Response) {
    const queryParams = await getManufacturersParamsDTO.parseAsync(
      parseUrl(req.url).query
    );
    const where: FindOptionsWhere<Manufacturer> = {};
    if (queryParams.productCategoryId) {
      where.productCategories = { id: queryParams.productCategoryId };
    }

    const result = await this.manufacturerRepository.find({
      order: { id: "ASC" },
      where,
    });
    res.json(result);
  }

  async getManufacturerById(req: Request, res: Response) {
    const result = await this.manufacturerRepository.findOneByOrFail({
      id: Number(req.params.id),
    });
    res.json(result);
  }

  async createManufacturer(req: Request, res: Response) {
    const body = await createManufacturerBodySchema.parseAsync(req.body);

    const manufacturer = this.manufacturerRepository.create(body);
    const result = await this.manufacturerRepository.save(manufacturer);
    res.json(result);
  }

  async updateManufacturer(req: Request, res: Response) {
    const body = await updateManufacturerBodySchema.parseAsync(req.body);

    const manufacturer = await this.manufacturerRepository.findOneByOrFail({
      id: Number(req.params.id),
    });
    this.manufacturerRepository.merge(manufacturer, body);
    const result = await this.manufacturerRepository.save(manufacturer);
    res.json(result);
  }

  async deleteManufacturer(req: Request, res: Response) {
    const result = await this.manufacturerRepository.delete({
      id: Number(req.params.id),
    });
    res.json(result);
  }

  async addCategoryToManufacturer(req: Request, res: Response) {
    const id = Number(req.params.id);
    const body = await addCategoryToManufacturerBodyDTO.parseAsync(req.body);
    const manufacturer = await this.manufacturerRepository.findOneOrFail({
      where: { id },
      relations: { productCategories: true },
    });
    const productCategory =
      await this.productCategoryRepository.findOneByOrFail({
        id: body.productCategoryId,
      });
    if (
      !manufacturer.productCategories.find(
        (item) => item.id === productCategory.id
      )
    ) {
      manufacturer.productCategories.push(productCategory);
      const result = await this.manufacturerRepository.save(manufacturer);
      res.json(result);
      return;
    }
    res.json(manufacturer);
  }

  async deleteCategoryFromManufacturer(req: Request, res: Response) {
    const id = Number(req.params.id);
    const categoryId = Number(req.params.category_id);
    const manufacturer = await this.manufacturerRepository.findOneOrFail({
      where: { id },
      relations: { productCategories: true },
    });
    manufacturer.productCategories = manufacturer.productCategories.filter(
      (item) => item.id !== categoryId
    );
    const result = await this.manufacturerRepository.save(manufacturer);
    res.json(result);
  }
}

export default new ManufacturerController();
