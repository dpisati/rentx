"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../entities/Rental");

class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async create({
    user_id,
    car_id,
    expected_return,
    end_date,
    id,
    total
  }) {
    const rental = this.repository.create({
      id,
      car_id,
      user_id,
      expected_return,
      end_date,
      total
    });
    await this.repository.save(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id) {
    return await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
  }

  async findOpenRentalByUser(user_id) {
    return await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
  }

  async findById(id) {
    return await this.repository.findOne(id);
  }

  async findByUser(user_id) {
    return this.repository.find({
      where: {
        user_id
      },
      relations: ["car"]
    });
  }

}

exports.RentalsRepository = RentalsRepository;