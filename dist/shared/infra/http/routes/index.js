"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

require("reflect-metadata");

var _express = require("express");

var _authenticate = require("./authenticate.routes");

var _cars = require("./cars.routes");

var _categories = require("./categories.routes");

var _rentals = require("./rentals.routes");

var _specifications = require("./specifications.routes");

var _users = require("./users.routes");

var _password = require("./password.routes");

const router = (0, _express.Router)();
exports.router = router;
router.use("/users", _users.usersRoutes);
router.use("/cars", _cars.carRoutes);
router.use("/rentals", _rentals.rentalsRoutes);
router.use("/categories", _categories.categoriesRoutes);
router.use("/specification", _specifications.specificationsRoutes);
router.use("/password", _password.passwordRoutes);
router.use(_authenticate.authenticateRoutes);