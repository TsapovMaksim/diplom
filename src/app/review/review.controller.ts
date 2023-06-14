import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import Review from "./review.entity";
import {
  createReviewBodySchema,
  getReviewsQueryParamsSchema,
} from "./dto/review.dto";
import userService from "../user/user.service";
import Product from "../product/product.entity";
import parseUrl from "../../utils/parse-url";

class ReviewController {
  reviewRepository;
  productRepository;
  constructor() {
    this.reviewRepository = AppDataSource.getRepository(Review);
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async getAll(req: Request, res: Response) {
    const query = await getReviewsQueryParamsSchema.parseAsync(
      parseUrl(req.url).query
    );
    const result = await this.reviewRepository.find({
      where: { product: { id: query.productId } },
      relations: {
        user: true,
      },
      select: {
        date: true,
        id: true,
        star: true,
        text: true,
        user: {
          name: true,
          surname: true,
        },
      },
    });
    res.json(result);
  }

  async create(req: Request, res: Response) {
    const body = await createReviewBodySchema.parseAsync(req.body);
    const review = this.reviewRepository.create({ ...body, date: new Date() });
    review.user = await userService.getById(body.userId);
    const product = await this.productRepository.findOneByOrFail({
      id: body.productId,
    });

    review.product = product;
    const result = await this.reviewRepository.save(review);
    const allReviews = await this.reviewRepository.find({
      where: { product: { id: body.productId } },
      select: { star: true },
    });

    const raiting =
      allReviews.reduce((acc, curr) => acc + curr.star, 0) / allReviews.length;

    this.productRepository.merge(product, {
      raiting,
      reviewsCount: allReviews.length,
    });
    await this.productRepository.save(product);
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const result = await this.reviewRepository.delete({ id });
    res.json(result);
  }
}

export default new ReviewController();
