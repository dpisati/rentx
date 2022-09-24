"use strict";

var _RentalsRepositoryInMemory = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");

var _AppError = require("@shared/errors/AppError");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let carsRepositoryInMemory;
let rentalsRepositoryInMemory;
let dayjsDateProvider;
describe("CreateRentalUseCase.spec", () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, "day").toDate();
  const add10Hours = (0, _dayjs.default)().add(10, "hours").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });
  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "123",
      brand: "test brand"
    });
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return: dayAdd24Hours
    });
    expect(rental).toHaveProperty("id");
  });
  it("should not be able to create a new rental if user has an active rental", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "123",
      expected_return: dayAdd24Hours,
      user_id: "12345"
    });
    await expect(createRentalUseCase.execute({
      user_id: "12345",
      car_id: "12345",
      expected_return: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("There is a rental in progress for this user"));
  });
  it("should not be able to create a new rental if car is unavailable", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "12345",
      car_id: "111",
      expected_return: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      user_id: "321",
      car_id: "111",
      expected_return: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("Car is not available"));
  });
  it("should not be able to rent with less than 24 hours", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "user01",
      car_id: "car01",
      expected_return: add10Hours
    })).rejects.toEqual(new _AppError.AppError("Rental has to be more than 24 hours"));
  });
});