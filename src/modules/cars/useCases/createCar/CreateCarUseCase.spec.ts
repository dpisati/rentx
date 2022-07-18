import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("CreateCarUseCase.spec", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Description for car",
      brand: "Car brand",
      daily_rate: 100,
      license_plate: "ABC-123",
      category_id: "category",
      fine_amount: 0,
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
      fine_amount: 0,
    });
    await expect(
      createCarUseCase.execute({
        name: "Car name",
        description: "Description for car",
        brand: "Car brand",
        daily_rate: 100,
        license_plate: "ABC-123",
        category_id: "category",
        fine_amount: 0,
      })
    ).rejects.toEqual(new AppError("Car already exists"));
  });

  it("should be available when created", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description for car",
      brand: "Car brand",
      daily_rate: 100,
      license_plate: "AVL-123",
      category_id: "category",
      fine_amount: 0,
    });

    expect(car.available).toBe(true);
  });
});
