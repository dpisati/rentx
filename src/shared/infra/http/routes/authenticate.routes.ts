import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", authenticateController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
