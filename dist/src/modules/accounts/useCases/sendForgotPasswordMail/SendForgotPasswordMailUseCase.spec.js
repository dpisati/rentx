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
const UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
const UsersTokensRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");
const DayjsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
const MailProviderInMemory_1 = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");
const AppError_1 = require("@shared/errors/AppError");
const SendForgotPasswordMailUseCase_1 = require("./SendForgotPasswordMailUseCase");
let sendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory;
let usersRepositoryInMemory;
let dateProvider;
let mailProvider;
describe("SendForgotPasswordMailUseCase.spec.ts", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory_1.UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory_1.MailProviderInMemory();
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase_1.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
    });
    it("should be able to send a forgot password email", () => __awaiter(void 0, void 0, void 0, function* () {
        const sendMail = jest.spyOn(mailProvider, "sendMail");
        yield usersRepositoryInMemory.create({
            driver_license: "1234",
            email: "test@me.com",
            name: "Test name",
            password: "test",
        });
        yield sendForgotPasswordMailUseCase.execute("test@me.com");
        expect(sendMail).toHaveBeenCalled();
    }));
    it("should not be able to send email if user does not exists", () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(sendForgotPasswordMailUseCase.execute("no-exist@me.com")).rejects.toEqual(new AppError_1.AppError("User does not exists"));
    }));
    it("should be able to create an user token", () => __awaiter(void 0, void 0, void 0, function* () {
        const generateTokenEmail = jest.spyOn(usersTokensRepositoryInMemory, "create");
        yield usersRepositoryInMemory.create({
            driver_license: "1234",
            email: "test2@me.com",
            name: "Test name",
            password: "test",
        });
        yield sendForgotPasswordMailUseCase.execute("test2@me.com");
        expect(generateTokenEmail).toHaveBeenCalled();
    }));
});
