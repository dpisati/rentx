"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoriesController = void 0;

var _tsyringe = require("tsyringe");

var _ListCategoryUseCase = require("./ListCategoryUseCase");

class ListCategoriesController {
  async handle(request, response) {
    const listCategoryUseCase = _tsyringe.container.resolve(_ListCategoryUseCase.ListCategoryUseCase);

    const all = await listCategoryUseCase.execute();
    return response.status(200).json(all);
  }

}

exports.ListCategoriesController = ListCategoriesController;