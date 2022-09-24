"use strict";

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("../../../../shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory;
let usersRepositoryInMemory;
let dateProvider;
let mailProvider;
describe("SendForgotPasswordMailUseCase.spec.ts", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("should be able to send a forgot password email", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "1234",
      email: "test@me.com",
      name: "Test name",
      password: "test"
    });
    await sendForgotPasswordMailUseCase.execute("test@me.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("no-exist@me.com")).rejects.toEqual(new _AppError.AppError("User does not exists"));
  });
  it("should be able to create an user token", async () => {
    const generateTokenEmail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "1234",
      email: "test2@me.com",
      name: "Test name",
      password: "test"
    });
    await sendForgotPasswordMailUseCase.execute("test2@me.com");
    expect(generateTokenEmail).toHaveBeenCalled();
  });
});