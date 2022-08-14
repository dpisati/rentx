import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("SendForgotPasswordMailUseCase.spec.ts", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    dateProvider = new DayjsDateProvider();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password email", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "1234",
      email: "test@me.com",
      name: "Test name",
      password: "test",
    });

    await sendForgotPasswordMailUseCase.execute("test@me.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("no-exist@me.com")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create an user token", async () => {
    const generateTokenEmail = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRepositoryInMemory.create({
      driver_license: "1234",
      email: "test2@me.com",
      name: "Test name",
      password: "test",
    });

    await sendForgotPasswordMailUseCase.execute("test2@me.com");

    expect(generateTokenEmail).toHaveBeenCalled();
  });
});
