"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CarsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
const SpecificationsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateCarSpecificationUseCase_1 = require("./CreateCarSpecificationUseCase");
let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe("CreateCarSpecificationUseCase.spec", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory_1.SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase_1.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });
    it("should not be able to create a new car specification if car does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const car_id = "1234";
        const specifications_id = ["54321"];
        yield expect(createCarSpecificationUseCase.execute({
            car_id,
            specifications_id,
        })).rejects.toEqual(new AppError_1.AppError("Car not found"));
    }));
    it("should be able to create a new car specification", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Car name",
            description: "Description for car",
            brand: "Car brand",
            daily_rate: 100,
            license_plate: "ABC-123",
            category_id: "category",
            fine_amount: 0,
        });
        const specification = yield specificationsRepositoryInMemory.create({
            description: "test description",
            name: "test",
        });
        const specifications_id = [specification.id];
        const specificationsCar = yield createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });
        expect(specificationsCar).toHaveProperty("specifications");
        expect(specificationsCar.specifications.length).toBe(1);
    }));
});
