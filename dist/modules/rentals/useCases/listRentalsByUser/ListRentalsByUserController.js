"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsByUserController = void 0;

var _tsyringe = require("tsyringe");

var _ListRentalsByUserUseCase = require("./ListRentalsByUserUseCase");

class ListRentalsByUserController {
  async handle(request, response) {
    const {
      id: user_id
    } = request.user;

    const listRentalsUseCase = _tsyringe.container.resolve(_ListRentalsByUserUseCase.ListRentalsByUserUseCase);

    const rentals = await listRentalsUseCase.execute(user_id);
    return response.status(200).json(rentals);
  }

}

exports.ListRentalsByUserController = ListRentalsByUserController;