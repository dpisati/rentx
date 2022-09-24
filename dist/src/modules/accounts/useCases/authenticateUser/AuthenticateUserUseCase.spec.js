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
const AppError_1 = require("@shared/errors/AppError");
const UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
const CreateUserUseCase_1 = require("../createUser/CreateUserUseCase");
const AuthenticateUserUseCase_1 = require("./AuthenticateUserUseCase");
const UsersTokensRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
const DayjsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let authenticateUserUseCase;
let createUserUseCase;
describe("AuthenticateUserUseCase.spec", () => {
    beforeAll(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory_1.UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase_1.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepositoryInMemory);
    });
    it("should be able to authenticate an user", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            name: "User test",
            email: "test@test.com",
            password: "test",
            driver_license: "1234",
        };
        yield createUserUseCase.execute(user);
        const result = yield authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });
        expect(result).toHaveProperty("token");
    }));
    it("should not be able to authenticate an non existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(authenticateUserUseCase.execute({
            email: "notanuser@test.com",
            password: "test-falsy",
        })).rejects.toEqual(new AppError_1.AppError("Email or password is invalid"));
    }));
    it("should not be able to authenticate with incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            name: "New User test",
            email: "new-test@test.com",
            password: "new-test",
            driver_license: "001234",
        };
        yield createUserUseCase.execute(user);
        yield expect(authenticateUserUseCase.execute({
            email: user.email,
            password: "wrong-password",
        })).rejects.toEqual(new AppError_1.AppError("Email or password is invalid"));
    }));
});
