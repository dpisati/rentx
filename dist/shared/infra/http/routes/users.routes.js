"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _CreateUserController = require("../../../../modules/accounts/useCases/createUser/CreateUserController");

var _updateUserAvatarController = require("../../../../modules/accounts/useCases/updateUserAvatar/updateUserAvatarController");

var _ProfileUserController = require("../../../../modules/cars/useCases/profileUserUseCase/ProfileUserController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const createUserController = new _CreateUserController.CreateUserController();
const updateUserAvatarController = new _updateUserAvatarController.UpdateUserAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController();
const uploadAvatar = (0, _multer.default)(_upload.default);
usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", _ensureAuthenticated.ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);
usersRoutes.get("/profile", _ensureAuthenticated.ensureAuthenticated, profileUserController.handle);