"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");

let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe("ListAvailableCarsUseCase.spec", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list cars", async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: "Car 1",
      description: "Test car description",
      brand: "New brand test",
      daily_rate: 100,
      license_plate: "ABC-001",
      category_id: "test_id",
      fine_amount: 1
    });
    const car2 = await carsRepositoryInMemory.create({
      name: "Car 2",
      description: "Test car description",
      brand: "New brand test",
      daily_rate: 100,
      license_plate: "ABC-002",
      category_id: "test_id",
      fine_amount: 1
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car1, car2]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 3",
      description: "Test car description",
      brand: "New brand test2",
      daily_rate: 100,
      license_plate: "ABC-003",
      category_id: "test_id2",
      fine_amount: 1
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "New brand test2"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 4",
      description: "Test car description",
      brand: "New brand test2",
      daily_rate: 100,
      license_plate: "ABC-004",
      category_id: "test_id2",
      fine_amount: 1
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car 4"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 5",
      description: "Test car description",
      brand: "New brand test2",
      daily_rate: 100,
      license_plate: "ABC-005",
      category_id: "test_id",
      fine_amount: 1
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "test_id"
    });
    expect(cars).toEqual([car]);
  });
});