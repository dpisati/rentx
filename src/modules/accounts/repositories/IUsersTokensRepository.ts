import { IUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create({
    user_id,
    expires_date,
    refresh_token,
  }: IUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refreshToken: string): Promise<UserTokens>;
}

export { IUsersTokensRepository };
