import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ListSpecificationController } from "@modules/cars/useCases/listSpecifications/ListSpecificationController";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

const specificationsRoutes = Router();
const createSpecificationsController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationsController.handle
);

specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };
