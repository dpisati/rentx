import { IUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: IUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, { expires_date, refresh_token, user_id });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.usersTokens.find(
      (user) => user.id === user_id && user.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((ut) => ut.id === id);

    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (user) => user.refresh_token === refreshToken
    );

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
