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
exports.UsersTokensRepositoryInMemory = void 0;
const UserTokens_1 = require("@modules/accounts/infra/typeorm/entities/UserTokens");
class UsersTokensRepositoryInMemory {
    constructor() {
        this.usersTokens = [];
    }
    create({ user_id, expires_date, refresh_token, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = new UserTokens_1.UserTokens();
            Object.assign(userToken, { expires_date, refresh_token, user_id });
            this.usersTokens.push(userToken);
            return userToken;
        });
    }
    findByUserIdAndRefreshToken(user_id, refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.usersTokens.find((user) => user.id === user_id && user.refresh_token === refresh_token);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = this.usersTokens.find((ut) => ut.id === id);
            this.usersTokens.splice(this.usersTokens.indexOf(userToken));
        });
    }
    findByRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = this.usersTokens.find((user) => user.refresh_token === refreshToken);
            return userToken;
        });
    }
}
exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;
