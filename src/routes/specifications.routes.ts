import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "../modules/cars/useCases/listSpecifications/ListSpecificationController";

const specificationsRoutes = Router();
const createSpecificationsController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/", createSpecificationsController.handle);

specificationsRoutes.get("/", listSpecificationController.handle);

export { specificationsRoutes };
