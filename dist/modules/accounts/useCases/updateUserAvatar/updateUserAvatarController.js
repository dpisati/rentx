"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _updateUserAvatarUseCase = require("./updateUserAvatarUseCase");

class UpdateUserAvatarController {
  async handle(request, response) {
    const {
      id: user_id
    } = request.user;
    const avatar_file = request.file.filename;

    const updateUserAvatarUseCase = _tsyringe.container.resolve(_updateUserAvatarUseCase.UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({
      user_id,
      avatar_file
    });
    return response.status(204).send();
  }

}

exports.UpdateUserAvatarController = UpdateUserAvatarController;