"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalController = void 0;

var _tsyringe = require("tsyringe");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

class CreateRentalController {
  async handle(request, response) {
    const {
      id
    } = request.user;
    const {
      expected_return,
      car_id
    } = request.body;

    const createRentalUseCase = _tsyringe.container.resolve(_CreateRentalUseCase.CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      car_id,
      expected_return,
      user_id: id
    });
    return response.status(201).json(rental);
  }

}

exports.CreateRentalController = CreateRentalController;