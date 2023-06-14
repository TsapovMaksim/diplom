import { Request, Response } from "express";
import { omit } from "lodash";
import {
  Between,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
} from "typeorm";
import { AppDataSource } from "../../data-source";
import parseUrl from "../../utils/parse-url";
import ProductCategory from "../category/entities/product-category.entity";
import CharacteristicType from "../characteristic/entities/characteristic-type.entity";
import Characteristic from "../characteristic/entities/characteristic.entity";
import imageService from "../image/image.service";
import Manufacturer from "../manufacturer/manufacturer.entity";
import {
  createProductBodySchema,
  getCatalogProductsParametersSchema,
  updateProductBodySchema,
} from "./dto/product.dto";
import Product from "./product.entity";
import paginatedReponse from "../../utils/paginated-response";

class ProductController {
  private productRepository;
  private cahracteristicTypeRepository;
  private manufacturerRepository;
  private productCategoryRepository;
  private characteristicRepository;
  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
    this.cahracteristicTypeRepository =
      AppDataSource.getRepository(CharacteristicType);
    this.manufacturerRepository = AppDataSource.getRepository(Manufacturer);
    this.productCategoryRepository =
      AppDataSource.getRepository(ProductCategory);
    this.characteristicRepository = AppDataSource.getRepository(Characteristic);
  }

  async getProducts(req: Request, res: Response) {
    const body = await getCatalogProductsParametersSchema.parseAsync(
      parseUrl(req.url).query
    );
    console.log("body", body);

    const result = await this.productRepository.find({
      where: {
        category: body.category
          ? { id: In(([] as number[]).concat(body.category)) }
          : undefined,
      },
    });
    res.json(result);
  }
  async getProductById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await this.productRepository.findOneOrFail({
      where: { id },
      relations: {
        category: true,
        manufacturer: true,
        preview: true,
      },
    });
    res.json(result);
  }
  async createProduct(req: Request, res: Response) {
    const body = await createProductBodySchema.parseAsync(req.body);
    const product = this.productRepository.create(body);
    const productCategory =
      await this.productCategoryRepository.findOneByOrFail({
        id: body.productCategoryId,
      });
    product.category = productCategory;
    const result = await this.productRepository.save(product);
    res.json(result);
  }

  async updateProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const body = await updateProductBodySchema.parseAsync(req.body);
    const product = await this.productRepository.findOneByOrFail({ id });
    this.productRepository.merge(product, omit(body, "manufacturer"));
    if (body.manufacturer) {
      product.manufacturer = await this.manufacturerRepository.findOneByOrFail({
        id: body.manufacturer,
      });
    }

    const result = await this.productRepository.save(product);
    res.json(result);
  }

  async deleteProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await this.productRepository.delete({ id });
    res.json(result);
  }

  async addCharacteristicToProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const body = req.body;
    const product = await this.productRepository.findOneOrFail({
      where: { id },
      relations: { characteristics: true },
    });
    body.forEach((item: any) => {
      product.characteristics.push(item);
    });
    const result = await this.productRepository.save(product);
    res.json(result);
  }
  async getGroupedProductCharacteristics(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await this.cahracteristicTypeRepository.find({
      where: {
        characteristics: { productCharacteristics: { product: { id } } },
      },
      relations: { characteristics: { productCharacteristics: true } },
    });
    res.json(result);
  }

  async getProductCharacteristicTypes(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await this.cahracteristicTypeRepository.find({
      where: {
        characteristics: { productCharacteristics: { product: { id } } },
      },
    });
    res.json(result);
  }
  async getGroupedProductCharacteristicsById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const groupId = Number(req.params.characteristic_id);
    const result = await this.characteristicRepository.find({
      where: {
        characteristicType: { id: groupId },
        productCharacteristics: { product: { id } },
      },
      relations: { productCharacteristics: true },
    });
    res.json(result);
  }

  async getCatalogProducts(req: Request, res: Response) {
    const queryParams = await getCatalogProductsParametersSchema.parseAsync(
      parseUrl(req.url).query
    );
    const where: FindOptionsWhere<Product> = {};

    if (queryParams.characteristics) {
      where.characteristics = {
        id: In(([] as number[]).concat(queryParams.characteristics)),
      };
    }
    if (queryParams.manufacturer) {
      where.manufacturer = {
        id: In(([] as number[]).concat(queryParams.manufacturer)),
      };
    }
    if (queryParams.category) {
      where.category = {
        id: In(([] as number[]).concat(queryParams.category)),
      };
    }
    if (queryParams.mainCategory) {
      where.category = {
        category: { id: In(([] as number[]).concat(queryParams.mainCategory)) },
      };
    }
    if (queryParams.title) {
      where.title = ILike(`%${queryParams.title}%`);
    }

    if (
      typeof queryParams.price_max !== "undefined" &&
      typeof queryParams.price_min !== "undefined"
    ) {
      where.price = Between(queryParams.price_min, queryParams.price_max);
    } else if (typeof queryParams.price_max !== "undefined") {
      where.price = LessThanOrEqual(queryParams.price_max);
    } else if (typeof queryParams.price_min !== "undefined") {
      where.price = MoreThanOrEqual(queryParams.price_min);
    }

    const order: FindOptionsOrder<Product> = {};
    if (queryParams.sort_property) {
      order[queryParams.sort_property] = queryParams.sort_direction;
    }
    const pageSize = queryParams.page_size || 10;
    const page = queryParams.page || 1;
    const skip = pageSize * (page - 1);

    const result = await this.productRepository.findAndCount({
      where,
      order,
      take: pageSize,
      skip: skip,
      select: {
        id: true,
        price: true,
        raiting: true,
        reviewsCount: true,
        short_description: true,
        title: true,
        category: { id: true, category: { id: true } },
        preview: {
          path: true,
        },
      },
      relations: { preview: true, category: { category: true } },
    });

    res.json(paginatedReponse(result[0], { page, pageSize, total: result[1] }));
  }

  async uploadImage(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await this.productRepository.findOneOrFail({
      where: { id },
      relations: { images: true },
    });
    if (Array.isArray(req.files)) {
      const files = await Promise.all(
        req.files.map((file) => imageService.save({ name: file.filename }))
      );
      product.images = product.images.concat(files);
      await this.productRepository.save(product);
      res.json(files);
      return;
    }
    res.json();
  }

  async getProductImages(req: Request, res: Response) {
    const id = Number(req.params.id);
    const productImages = await this.productRepository.findOneOrFail({
      where: { id },
      relations: { images: true },
      select: { images: true },
    });
    res.json(productImages.images);
  }

  async deleteImage(req: Request, res: Response) {
    const id = Number(req.params.id);
    const imageId = Number(req.params.image_id);

    const product = await this.productRepository.findOneOrFail({
      where: { id },
      relations: { images: true },
    });

    product.images = product.images.filter((image) => image.id !== imageId);
    const result = await this.productRepository.save(product);
    res.json(result);
  }

  async changePreview(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (!req.file) {
      res.status(400).send();
      return;
    }
    const preview = await imageService.save({ name: req.file.filename });
    const result = await this.productRepository.save({ id, preview });
    res.json(result);
  }

  async deleteProductCharacteristicFromProduct(req: Request, res: Response) {
    const id = Number(req.params.id);
    const productCharacteristicId = Number(
      req.params.product_characteristic_id
    );

    const product = await this.productRepository.findOneOrFail({
      where: {
        id,
      },
      relations: { characteristics: true },
    });
    product.characteristics = product.characteristics.filter(
      (item) => item.id !== productCharacteristicId
    );
    const result = await this.productRepository.save(product);
    res.json(result);
  }
}

export default new ProductController();
