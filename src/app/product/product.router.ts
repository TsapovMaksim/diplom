import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import ProductController from "./product.controller";
import upload from "../../middlewares/upload";

const productRouter = Router();

productRouter
  .route("/product")
  .get(
    expressAsyncHandler(ProductController.getProducts.bind(ProductController))
  )
  .post(
    expressAsyncHandler(ProductController.createProduct.bind(ProductController))
  );

productRouter
  .route("/product/catalog")
  .get(
    expressAsyncHandler(
      ProductController.getCatalogProducts.bind(ProductController)
    )
  );

productRouter
  .route("/product/:id")
  .get(
    expressAsyncHandler(
      ProductController.getProductById.bind(ProductController)
    )
  )
  .patch(
    expressAsyncHandler(ProductController.updateProduct.bind(ProductController))
  )
  .delete(
    expressAsyncHandler(ProductController.deleteProduct.bind(ProductController))
  );

productRouter
  .route("/product/:id/characteristic")
  .get(
    expressAsyncHandler(
      ProductController.getGroupedProductCharacteristics.bind(ProductController)
    )
  )
  .post(
    expressAsyncHandler(
      ProductController.addCharacteristicToProduct.bind(ProductController)
    )
  );
productRouter
  .route("/product/:id/characteristic/:characteristic_id")
  .get(
    expressAsyncHandler(
      ProductController.getGroupedProductCharacteristicsById.bind(
        ProductController
      )
    )
  );
productRouter
  .route("/product/:id/characteristic-types")
  .get(
    expressAsyncHandler(
      ProductController.getProductCharacteristicTypes.bind(ProductController)
    )
  );
productRouter
  .route("/product/:id/propduct-characteristic/:product_characteristic_id")
  .delete(
    expressAsyncHandler(
      ProductController.deleteProductCharacteristicFromProduct.bind(
        ProductController
      )
    )
  );

productRouter
  .route("/product/:id/image")
  .get(
    expressAsyncHandler(
      ProductController.getProductImages.bind(ProductController)
    )
  )
  .post(
    upload.array("files", 12),
    expressAsyncHandler(ProductController.uploadImage.bind(ProductController))
  );
productRouter
  .route("/product/:id/preview")
  .post(
    upload.single("file"),
    expressAsyncHandler(ProductController.changePreview.bind(ProductController))
  );
productRouter
  .route("/product/:id/image/:image_id")
  .delete(
    expressAsyncHandler(ProductController.deleteImage.bind(ProductController))
  );

export default productRouter;
