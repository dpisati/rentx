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
const ListAvailableCarsUseCase_1 = require("./ListAvailableCarsUseCase");
let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe("ListAvailableCarsUseCase.spec", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase_1.ListAvailableCarsUseCase(carsRepositoryInMemory);
    });
    it("should be able to list cars", () => __awaiter(void 0, void 0, void 0, function* () {
        const car1 = yield carsRepositoryInMemory.create({
            name: "Car 1",
            description: "Test car description",
            brand: "New brand test",
            daily_rate: 100,
            license_plate: "ABC-001",
            category_id: "test_id",
            fine_amount: 1,
        });
        const car2 = yield carsRepositoryInMemory.create({
            name: "Car 2",
            description: "Test car description",
            brand: "New brand test",
            daily_rate: 100,
            license_plate: "ABC-002",
            category_id: "test_id",
            fine_amount: 1,
        });
        const cars = yield listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([car1, car2]);
    }));
    it("should be able to list all available cars by brand", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Car 3",
            description: "Test car description",
            brand: "New brand test2",
            daily_rate: 100,
            license_plate: "ABC-003",
            category_id: "test_id2",
            fine_amount: 1,
        });
        const cars = yield listAvailableCarsUseCase.execute({
            brand: "New brand test2",
        });
        expect(cars).toEqual([car]);
    }));
    it("should be able to list all available cars by name", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Car 4",
            description: "Test car description",
            brand: "New brand test2",
            daily_rate: 100,
            license_plate: "ABC-004",
            category_id: "test_id2",
            fine_amount: 1,
        });
        const cars = yield listAvailableCarsUseCase.execute({ name: "Car 4" });
        expect(cars).toEqual([car]);
    }));
    it("should be able to list all available cars by category_id", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Car 5",
            description: "Test car description",
            brand: "New brand test2",
            daily_rate: 100,
            license_plate: "ABC-005",
            category_id: "test_id",
            fine_amount: 1,
        });
        const cars = yield listAvailableCarsUseCase.execute({
            category_id: "test_id",
        });
        expect(cars).toEqual([car]);
    }));
});
