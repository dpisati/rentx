"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload_1 = __importDefault(require("@config/upload"));
const ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
const CreateUserController_1 = require("@modules/accounts/useCases/createUser/CreateUserController");
const updateUserAvatarController_1 = require("@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController");
const ProfileUserController_1 = require("@modules/cars/useCases/profileUserUseCase/ProfileUserController");
const usersRoutes = (0, express_1.Router)();
exports.usersRoutes = usersRoutes;
const createUserController = new CreateUserController_1.CreateUserController();
const updateUserAvatarController = new updateUserAvatarController_1.UpdateUserAvatarController();
const profileUserController = new ProfileUserController_1.ProfileUserController();
const uploadAvatar = (0, multer_1.default)(upload_1.default);
usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", ensureAuthenticated_1.ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
usersRoutes.get("/profile", ensureAuthenticated_1.ensureAuthenticated, profileUserController.handle);