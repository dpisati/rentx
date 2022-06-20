import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateController = new AuthenticateUserController();
const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", authenticateController.handle);

export { authenticateRoutes };
