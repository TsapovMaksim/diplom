import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import FilterController from "./filter.controller";

const filterRouter = Router();

filterRouter
  .route("/filter")
  .get(expressAsyncHandler(FilterController.getFilters.bind(FilterController)))
  .post(
    expressAsyncHandler(FilterController.createFilter.bind(FilterController))
  );

filterRouter
  .route("/filter/:id")
  .get(
    expressAsyncHandler(FilterController.getFilterById.bind(FilterController))
  )
  .patch(
    expressAsyncHandler(FilterController.udpateFilter.bind(FilterController))
  )
  .delete(
    expressAsyncHandler(FilterController.deleteFilter.bind(FilterController))
  );

filterRouter
  .route("/filter-value")
  .get(
    expressAsyncHandler(FilterController.getFilterValues.bind(FilterController))
  )
  .post(
    expressAsyncHandler(
      FilterController.createFilterValue.bind(FilterController)
    )
  );

filterRouter
  .route("/filter-value/:id")
  .get(
    expressAsyncHandler(
      FilterController.getFilterValueById.bind(FilterController)
    )
  )
  .patch(
    expressAsyncHandler(
      FilterController.udpateFilterValue.bind(FilterController)
    )
  )
  .delete(
    expressAsyncHandler(
      FilterController.deleteFilterValue.bind(FilterController)
    )
  );

export default filterRouter;
