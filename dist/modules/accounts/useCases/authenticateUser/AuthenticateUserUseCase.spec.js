"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _UsersRepositoryInMemory = require("../../repositories/in-memory/UsersRepositoryInMemory");

var _CreateUserUseCase = require("../createUser/CreateUserUseCase");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

var _UsersTokensRepositoryInMemory = require("../../repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let authenticateUserUseCase;
let createUserUseCase;
describe("AuthenticateUserUseCase.spec", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user = {
      name: "User test",
      email: "test@test.com",
      password: "test",
      driver_license: "1234"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("should not be able to authenticate an non existing user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "notanuser@test.com",
      password: "test-falsy"
    })).rejects.toEqual(new _AppError.AppError("Email or password is invalid"));
  });
  it("should not be able to authenticate with incorrect password", async () => {
    const user = {
      name: "New User test",
      email: "new-test@test.com",
      password: "new-test",
      driver_license: "001234"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "wrong-password"
    })).rejects.toEqual(new _AppError.AppError("Email or password is invalid"));
  });
});