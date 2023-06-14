import basketRouter from "./basket/basket.router";
import categoryRouter from "./category/category.router";
import characteristicsRouter from "./characteristic/characteristicts.router";
import favoriteRouter from "./favorite/favorite.router";
import filterRouter from "./filter/filter.router";
import manufacturerRouter from "./manufacturer/manufacturer.router";
import productRouter from "./product/product.router";
import reviewRouter from "./review/review.router";
import userRouter from "./user/user.router";

const routes = [
  categoryRouter,
  characteristicsRouter,
  filterRouter,
  manufacturerRouter,
  productRouter,
  userRouter,
  reviewRouter,
  basketRouter,
  favoriteRouter,
];

export default routes;
