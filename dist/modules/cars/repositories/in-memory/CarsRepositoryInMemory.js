"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("../../infra/typeorm/entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable(brand, category_id, name) {
    const availableCars = this.cars.filter(car => {
      if (car.available === true || category_id && car.category_id === category_id || brand && car.brand === brand || name && car.name === name) {
        return car;
      }

      return null;
    });
    return availableCars;
  }

  async findById(id) {
    const car = this.cars.find(car => car.id === id);
    return car;
  }

  async updateAvailable(id, available) {
    const carIndex = this.cars.findIndex(car => car.id === id);
    this.cars[carIndex].available = available;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;