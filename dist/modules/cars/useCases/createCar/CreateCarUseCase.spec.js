"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateCarUseCase = require("./CreateCarUseCase");

let createCarUseCase;
let carsRepositoryInMemory;
describe("CreateCarUseCase.spec", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarUseCase = new _CreateCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Description for car",
      brand: "Car brand",
      daily_rate: 100,
      license_plate: "ABC-123",
      category_id: "category",
      fine_amount: 0
    });
    expect(car).toHaveProperty("id");
  });
  it("should not be able to create a car with an existing license plate", async () => {
    await createCarUseCase.execute({
      name: "Car name",
      description: "Description for car",
      brand: "Car brand",
      daily_rate: 100,
      license_plate: "ABC-123",
      category_id: "category",
      fine_amount: 0
    });
    await expect(createCarUseCase.execute({
      name: "Car name",
      description: "Description for car",
      brand: "Car brand",
      daily_rate: 100,
      license_plate: "ABC-123",
      category_id: "category",
      fine_amount: 0
    })).rejects.toEqual(new _AppError.AppError("Car already exists"));
  });
  it("should be available when created", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description for car",
      brand: "Car brand",
      daily_rate: 100,
      license_plate: "AVL-123",
      category_id: "category",
      fine_amount: 0
    });
    expect(car.available).toBe(true);
  });
});