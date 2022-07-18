import { IUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: IUserTokenDTO): Promise<UserTokens> {
    const user_token = this.repository.create({
      user_id,
      expires_date,
      refresh_token,
    });

    await this.repository.save(user_token);

    return user_token;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = await this.repository.findOne({ user_id, refresh_token });

    return userToken;
  }

  async deleteById(id: string) {
    await this.repository.delete(id);
  }
}

export { UsersTokensRepository };
