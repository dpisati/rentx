"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationsRoutes = void 0;

var _express = require("express");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _ListSpecificationController = require("../../../../modules/cars/useCases/listSpecifications/ListSpecificationController");

var _CreateSpecificationController = require("../../../../modules/cars/useCases/createSpecification/CreateSpecificationController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

const specificationsRoutes = (0, _express.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecificationsController = new _CreateSpecificationController.CreateSpecificationController();
const listSpecificationController = new _ListSpecificationController.ListSpecificationController();
specificationsRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationsController.handle);
specificationsRoutes.get("/", listSpecificationController.handle);