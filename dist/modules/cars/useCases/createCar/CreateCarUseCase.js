"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarUseCase = void 0;

var _ICarsRepository = require("@modules/cars/repositories/ICarsRepository");

var _AppError = require("@shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateCarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CarsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICarsRepository.ICarsRepository === "undefined" ? Object : _ICarsRepository.ICarsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCarUseCase {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute({
    name,
    description,
    brand,
    daily_rate,
    license_plate,
    category_id,
    fine_amount
  }) {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

    if (carAlreadyExists) {
      throw new _AppError.AppError("Car already exists");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      brand,
      daily_rate,
      license_plate,
      category_id,
      fine_amount
    });
    return car;
  }

}) || _class) || _class) || _class) || _class);
exports.CreateCarUseCase = CreateCarUseCase;