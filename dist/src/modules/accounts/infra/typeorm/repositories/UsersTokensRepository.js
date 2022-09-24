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
exports.UsersTokensRepository = void 0;
const typeorm_1 = require("typeorm");
const UserTokens_1 = require("../entities/UserTokens");
class UsersTokensRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(UserTokens_1.UserTokens);
    }
    create({ user_id, expires_date, refresh_token, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_token = this.repository.create({
                user_id,
                expires_date,
                refresh_token,
            });
            yield this.repository.save(user_token);
            return user_token;
        });
    }
    findByUserIdAndRefreshToken(user_id, refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = yield this.repository.findOne({ user_id, refresh_token });
            return userToken;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(id);
        });
    }
    findByRefreshToken(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = yield this.repository.findOne({ refresh_token });
            return userToken;
        });
    }
}
exports.UsersTokensRepository = UsersTokensRepository;
