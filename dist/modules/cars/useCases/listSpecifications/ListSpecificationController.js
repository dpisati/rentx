"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSpecificationController = void 0;

var _tsyringe = require("tsyringe");

var _ListSpecificationUseCase = require("./ListSpecificationUseCase");

class ListSpecificationController {
  async handle(request, response) {
    const listSpecificationUseCase = _tsyringe.container.resolve(_ListSpecificationUseCase.ListSpecificationUseCase);

    const all = await listSpecificationUseCase.execute();
    return response.status(200).json(all);
  }

}

exports.ListSpecificationController = ListSpecificationController;