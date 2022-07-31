import "reflect-metadata";
import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { carRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { passwordRoutes } from "./password.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/cars", carRoutes);
router.use("/rentals", rentalsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specification", specificationsRoutes);
router.use("/password", passwordRoutes);
router.use(authenticateRoutes);

export { router };
