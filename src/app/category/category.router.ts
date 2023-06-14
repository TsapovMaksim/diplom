import { Router } from "express";
import CategoryController from "./category.controller";
import expressAsyncHandler from "express-async-handler";

const categoryRouter = Router();

categoryRouter
  .route("/categories")
  .post(
    expressAsyncHandler(
      CategoryController.createCategory.bind(CategoryController)
    )
  )
  .get(
    expressAsyncHandler(
      CategoryController.getCategories.bind(CategoryController)
    )
  );

categoryRouter
  .route("/categories/:id")
  .get(
    expressAsyncHandler(
      CategoryController.getCategoryById.bind(CategoryController)
    )
  )
  .patch(
    expressAsyncHandler(
      CategoryController.updateCategory.bind(CategoryController)
    )
  )
  .delete(
    expressAsyncHandler(
      CategoryController.deleteCategory.bind(CategoryController)
    )
  );

categoryRouter
  .route("/categories/:id/product-categories")
  .get(
    expressAsyncHandler(
      CategoryController.getProductCategories.bind(CategoryController)
    )
  )
  .post(
    expressAsyncHandler(
      CategoryController.createProductCategory.bind(CategoryController)
    )
  );

categoryRouter
  .route("/categories/:id/product-categories/:category_id")
  .get(
    expressAsyncHandler(
      CategoryController.getProductCategoryById.bind(CategoryController)
    )
  )
  .delete(
    expressAsyncHandler(
      CategoryController.deleteProductCategory.bind(CategoryController)
    )
  )
  .patch(
    expressAsyncHandler(
      CategoryController.updateProductCategory.bind(CategoryController)
    )
  );

categoryRouter
  .route(`/categories/:id/product-categories/:category_id/manufacturer`)
  .post(
    expressAsyncHandler(
      CategoryController.addManufacturerToCategory.bind(CategoryController)
    )
  );

export default categoryRouter;
