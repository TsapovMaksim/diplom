import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import Filter from "./entities/filter.entity";
import {
  createFilterBodySchema,
  getFiltersParamsSchema,
  updateFilterBodySchema,
} from "./dto/filter.dto";
import parseUrl from "../../utils/parse-url";
import FilterValue from "./entities/filter-value.entity";
import {
  createFilterValueBodySchema,
  getFiltersValueParamsSchema,
  updateFilterValueBodySchema,
} from "./dto/filter-value.dto";
import Characteristic from "../characteristic/entities/characteristic.entity";
import ProductCategory from "../category/entities/product-category.entity";
import ProductCharacteristic from "../characteristic/entities/product-characteristic.entity";
import { FindOptionsWhere } from "typeorm";

class FilterController {
  private filterRepository;
  private filterValueRepository;
  private characteristicRepository;
  private productCategoryRepository;
  private productCharacteristicRepository;

  constructor() {
    this.filterRepository = AppDataSource.getRepository(Filter);
    this.filterValueRepository = AppDataSource.getRepository(FilterValue);
    this.characteristicRepository = AppDataSource.getRepository(Characteristic);
    this.productCategoryRepository =
      AppDataSource.getRepository(ProductCategory);
    this.productCharacteristicRepository = AppDataSource.getRepository(
      ProductCharacteristic
    );
  }

  async getFilters(req: Request, res: Response) {
    const queryParams = await getFiltersParamsSchema.parseAsync(
      parseUrl(req.url).query
    );
    const options: FindOptionsWhere<Filter> = {
      productCategory: { id: queryParams.productCategoryId },
    };
    if (queryParams.characteristicId) {
      options.characteristic = { id: queryParams.characteristicId };
    }
    const result = await this.filterRepository.find({
      where: options,
      relations: { filterValues: { productCharacteristic: true } },
    });
    res.json(result);
  }
  async createFilter(req: Request, res: Response) {
    const body = await createFilterBodySchema.parseAsync(req.body);
    const filter = this.filterRepository.create(body);
    filter.characteristic = await this.characteristicRepository.findOneByOrFail(
      { id: body.characteristicId }
    );
    filter.productCategory =
      await this.productCategoryRepository.findOneByOrFail({
        id: body.productCategoryId,
      });
    const result = await this.filterRepository.save(filter);
    res.json(result);
  }

  async udpateFilter(req: Request, res: Response) {
    const body = await updateFilterBodySchema.parseAsync(req.body);
    const filter = await this.filterRepository.findOneByOrFail({
      id: Number(req.params.id),
    });
    this.filterRepository.merge(filter, body);
    const result = await this.filterRepository.save(filter);
    res.json(result);
  }

  async getFilterById(req: Request, res: Response) {
    const result = await this.filterRepository.findOneOrFail({
      where: { id: Number(req.params.id) },
      relations: { characteristic: true },
    });
    res.json(result);
  }

  async deleteFilter(req: Request, res: Response) {
    const result = await this.filterRepository.delete({
      id: Number(req.params.id),
    });
    res.json(result);
  }

  async getFilterValues(req: Request, res: Response) {
    const queryParams = await getFiltersValueParamsSchema.parseAsync(
      parseUrl(req.url).query
    );
    const result = await this.filterValueRepository.find({
      where: {
        filter: { id: queryParams.filterId },
      },
    });
    res.json(result);
  }
  async createFilterValue(req: Request, res: Response) {
    const body = await createFilterValueBodySchema.parseAsync(req.body);
    const filterValue = this.filterValueRepository.create(body);
    filterValue.filter = await this.filterRepository.findOneByOrFail({
      id: body.filterId,
    });
    filterValue.productCharacteristic =
      await this.productCharacteristicRepository.findOneByOrFail({
        id: body.productCharacteristicId,
      });
    const result = await this.filterValueRepository.save(filterValue);
    res.json(result);
  }

  async udpateFilterValue(req: Request, res: Response) {
    const body = await updateFilterValueBodySchema.parseAsync(req.body);
    const filterValue = await this.filterValueRepository.findOneByOrFail({
      id: Number(req.params.id),
    });
    this.filterValueRepository.merge(filterValue, body);
    if (body.productCharacteristicId) {
      filterValue.productCharacteristic =
        await this.productCharacteristicRepository.findOneByOrFail({
          id: body.productCharacteristicId,
        });
    }
    const result = await this.filterValueRepository.save(filterValue);
    res.json(result);
  }

  async getFilterValueById(req: Request, res: Response) {
    const result = await this.filterValueRepository.findOneByOrFail({
      id: Number(req.params.id),
    });
    res.json(result);
  }

  async deleteFilterValue(req: Request, res: Response) {
    const result = await this.filterValueRepository.delete({
      id: Number(req.params.id),
    });
    res.json(result);
  }
}

export default new FilterController();
