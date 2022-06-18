import { Router } from "express";
import "reflect-metadata";
import { authenticateRoutes } from "./authenticate.routes";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use(authenticateRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specification", specificationsRoutes);

export { router };
