"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarController = void 0;

var _tsyringe = require("tsyringe");

var _CreateCarUseCase = require("./CreateCarUseCase");

class CreateCarController {
  async handle(request, response) {
    const {
      name,
      description,
      brand,
      daily_rate,
      license_plate,
      category_id,
      fine_amount
    } = request.body;

    const createCarUseCase = _tsyringe.container.resolve(_CreateCarUseCase.CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      description,
      brand,
      daily_rate,
      license_plate,
      category_id,
      fine_amount
    });
    return response.status(201).json(car);
  }

}

exports.CreateCarController = CreateCarController;