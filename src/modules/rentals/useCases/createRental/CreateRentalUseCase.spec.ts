import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

import dayjs from "dayjs";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("CreateRentalUseCase.spec", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  const add10Hours = dayjs().add(10, "hours").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "123",
      brand: "test brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
  });

  it("should not be able to create a new rental if user has an active rental", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "123",
      expected_return: dayAdd24Hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: "12345",
        expected_return: dayAdd24Hours,
      })
    ).rejects.toEqual(
      new AppError("There is a rental in progress for this user")
    );
  });

  it("should not be able to create a new rental if car is unavailable", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "12345",
      car_id: "111",
      expected_return: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "321",
        car_id: "111",
        expected_return: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is not available"));
  });

  it("should not be able to rent with less than 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "user01",
        car_id: "car01",
        expected_return: add10Hours,
      })
    ).rejects.toEqual(new AppError("Rental has to be more than 24 hours"));
  });
});
