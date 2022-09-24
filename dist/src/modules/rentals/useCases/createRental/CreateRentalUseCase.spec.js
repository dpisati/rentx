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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RentalsRepositoryInMemory_1 = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");
const AppError_1 = require("@shared/errors/AppError");
const CreateRentalUseCase_1 = require("./CreateRentalUseCase");
const dayjs_1 = __importDefault(require("dayjs"));
const DayjsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
const CarsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
let createRentalUseCase;
let carsRepositoryInMemory;
let rentalsRepositoryInMemory;
let dayjsDateProvider;
describe("CreateRentalUseCase.spec", () => {
    const dayAdd24Hours = (0, dayjs_1.default)().add(1, "day").toDate();
    const add10Hours = (0, dayjs_1.default)().add(10, "hours").toDate();
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory_1.RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase_1.CreateRentalUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
    });
    it("should be able to create a new rental", () => __awaiter(void 0, void 0, void 0, function* () {
        const car = yield carsRepositoryInMemory.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "123",
            brand: "test brand",
        });
        const rental = yield createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return: dayAdd24Hours,
        });
        expect(rental).toHaveProperty("id");
    }));
    it("should not be able to create a new rental if user has an active rental", () => __awaiter(void 0, void 0, void 0, function* () {
        yield rentalsRepositoryInMemory.create({
            car_id: "123",
            expected_return: dayAdd24Hours,
            user_id: "12345",
        });
        yield expect(createRentalUseCase.execute({
            user_id: "12345",
            car_id: "12345",
            expected_return: dayAdd24Hours,
        })).rejects.toEqual(new AppError_1.AppError("There is a rental in progress for this user"));
    }));
    it("should not be able to create a new rental if car is unavailable", () => __awaiter(void 0, void 0, void 0, function* () {
        yield rentalsRepositoryInMemory.create({
            user_id: "12345",
            car_id: "111",
            expected_return: dayAdd24Hours,
        });
        yield expect(createRentalUseCase.execute({
            user_id: "321",
            car_id: "111",
            expected_return: dayAdd24Hours,
        })).rejects.toEqual(new AppError_1.AppError("Car is not available"));
    }));
    it("should not be able to rent with less than 24 hours", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(createRentalUseCase.execute({
            user_id: "user01",
            car_id: "car01",
            expected_return: add10Hours,
        })).rejects.toEqual(new AppError_1.AppError("Rental has to be more than 24 hours"));
    }));
});
