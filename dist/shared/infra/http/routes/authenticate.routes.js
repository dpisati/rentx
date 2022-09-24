"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateRoutes = void 0;

var _express = require("express");

var _AuthenticateUserController = require("@modules/accounts/useCases/authenticateUser/AuthenticateUserController");

var _RefreshTokenController = require("@modules/accounts/useCases/refreshToken/RefreshTokenController");

const authenticateController = new _AuthenticateUserController.AuthenticateUserController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
const authenticateRoutes = (0, _express.Router)();
exports.authenticateRoutes = authenticateRoutes;
authenticateRoutes.post("/sessions", authenticateController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);