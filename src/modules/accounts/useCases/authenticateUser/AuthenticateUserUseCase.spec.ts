import { AppError } from "@shared/errors/AppError";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("AuthenticateUserUseCase.spec", () => {
  beforeAll(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user = {
      name: "User test",
      email: "test@test.com",
      password: "test",
      driver_license: "1234",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an non existing user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "notanuser@test.com",
        password: "test-falsy",
      })
    ).rejects.toEqual(new AppError("Email or password is invalid"));
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user = {
      name: "New User test",
      email: "new-test@test.com",
      password: "new-test",
      driver_license: "001234",
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong-password",
      })
    ).rejects.toEqual(new AppError("Email or password is invalid"));
  });
});
