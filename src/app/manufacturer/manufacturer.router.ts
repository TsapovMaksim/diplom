import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import ManufacturerController from "./manufacturer.controller";

const manufacturerRouter = Router();

manufacturerRouter
  .route("/manufacturer")
  .get(
    expressAsyncHandler(
      ManufacturerController.getManufacturers.bind(ManufacturerController)
    )
  )
  .post(
    expressAsyncHandler(
      ManufacturerController.createManufacturer.bind(ManufacturerController)
    )
  );

manufacturerRouter
  .route("/manufacturer/:id")
  .get(
    expressAsyncHandler(
      ManufacturerController.getManufacturerById.bind(ManufacturerController)
    )
  )
  .patch(
    expressAsyncHandler(
      ManufacturerController.updateManufacturer.bind(ManufacturerController)
    )
  )
  .delete(
    expressAsyncHandler(
      ManufacturerController.deleteManufacturer.bind(ManufacturerController)
    )
  );

manufacturerRouter
  .route("/manufacturer/:id/category")
  .post(
    expressAsyncHandler(
      ManufacturerController.addCategoryToManufacturer.bind(
        ManufacturerController
      )
    )
  );
manufacturerRouter
  .route("/manufacturer/:id/category/:category_id")
  .delete(
    expressAsyncHandler(
      ManufacturerController.deleteCategoryFromManufacturer.bind(
        ManufacturerController
      )
    )
  );

export default manufacturerRouter;
