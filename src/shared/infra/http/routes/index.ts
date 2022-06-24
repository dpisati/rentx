import { Router } from "express";
import "reflect-metadata";
import { authenticateRoutes } from "./authenticate.routes";
import { carRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/cars", carRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specification", specificationsRoutes);
router.use(authenticateRoutes);

export { router };
