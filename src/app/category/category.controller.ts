import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import Category from "./entities/category.entity";
import { createCategoryBodyDTO } from "./dto/create-category.dto";
import { updateCategoryBodyDTO } from "./dto/udpate-category.dto";
import ProductCategory from "./entities/product-category.entity";
import { createProductCategoryBodyDTO } from "./dto/create-product-category.dto";
import { updateProductCategoryBodyDTO } from "./dto/update-product-category.dto";
import { addManufacturerToCategoryBodyDTO } from "./dto/add-manufacturer-to-category.dto";
import Manufacturer from "../manufacturer/manufacturer.entity";

class CategoryController {
  private categoryRepository;
  private productCategoryRepository;
  private manufacturerRepostitory;
  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
    this.productCategoryRepository =
      AppDataSource.getRepository(ProductCategory);
    this.manufacturerRepostitory = AppDataSource.getRepository(Manufacturer);
  }

  async createCategory(req: Request, res: Response) {
    const body = await createCategoryBodyDTO.parseAsync(req.body);
    const category = this.categoryRepository.create(body);
    const result = await this.categoryRepository.save(category);

    res.json(result);
  }
  async getCategories(req: Request, res: Response) {
    const result = await this.categoryRepository.find({
      relations: {
        productCategories: true,
      },
    });
    res.json(result);
  }
  async getCategoryById(req: Request, res: Response) {
    const params = req.params as { id: string };
    const category = await this.categoryRepository.findOneByOrFail({
      id: Number(params.id),
    });
    res.json(category);
  }
  async updateCategory(req: Request, res: Response) {
    const body = await updateCategoryBodyDTO.parseAsync(req.body);
    const category = await this.categoryRepository.findOneBy({
      id: Number(req.params.id),
    });
    if (!category) {
      res.status(404).json("not found");
      throw new Error("not found");
    }
    this.categoryRepository.merge(category, body);
    const result = await this.categoryRepository.save(category);
    res.json(result);
  }

  async deleteCategory(req: Request, res: Response) {
    await this.categoryRepository.delete({ id: Number(req.params.id) });
    res.send(null);
  }

  async getProductCategories(req: Request, res: Response) {
    const params = req.params as { id: string };
    const results = await this.productCategoryRepository.find({
      where: { category: { id: Number(params.id) } },
    });
    res.json(results);
  }

  async createProductCategory(req: Request, res: Response) {
    const params = req.params as { id: string };

    const body = await createProductCategoryBodyDTO.parseAsync(req.body);
    const productCategory = this.productCategoryRepository.create(body);
    productCategory.category = await this.categoryRepository.findOneByOrFail({
      id: Number(params.id),
    });
    const result = await this.productCategoryRepository.save(productCategory);
    res.json(result);
  }
  async deleteProductCategory(req: Request, res: Response) {
    const params = req.params as { id: string; category_id: string };

    const result = await this.productCategoryRepository.delete({
      id: Number(params.category_id),
      category: { id: Number(params.id) },
    });
    res.json(result);
  }

  async updateProductCategory(req: Request, res: Response) {
    const params = req.params as { id: string; category_id: string };
    const body = await updateProductCategoryBodyDTO.parseAsync(req.body);

    const productCategory =
      await this.productCategoryRepository.findOneByOrFail({
        id: Number(params.category_id),
      });
    this.productCategoryRepository.merge(productCategory, body);

    const result = await this.productCategoryRepository.save(productCategory);
    res.json(result);
  }

  async getProductCategoryById(req: Request, res: Response) {
    const params = req.params as { id: string; category_id: string };

    const result = await this.productCategoryRepository.findOneByOrFail({
      id: Number(params.category_id),
      category: {
        id: Number(params.id),
      },
    });

    res.json(result);
  }

  async addManufacturerToCategory(req: Request, res: Response) {
    const id = Number(req.params.category_id);
    const body = await addManufacturerToCategoryBodyDTO.parseAsync(req.body);
    const category = await this.productCategoryRepository.findOneOrFail({
      where: { id },
      relations: { manufacturers: true },
    });
    const manufacturer = await this.manufacturerRepostitory.findOneByOrFail({
      id: body.manufacturerId,
    });
    if (!category.manufacturers.find((item) => item.id === manufacturer.id)) {
      category.manufacturers.push(manufacturer);
      await this.productCategoryRepository.save(category);
    }
    res.json();
  }
}

export default new CategoryController();
