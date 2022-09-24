"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImagesController = void 0;

var _tsyringe = require("tsyringe");

var _UploadCarImagesUseCase = require("./UploadCarImagesUseCase");

class UploadCarImagesController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const images = request.files;

    const uploadCarImageUseCase = _tsyringe.container.resolve(_UploadCarImagesUseCase.UploadCarImagesUseCase);

    const images_name = images.map(file => file.filename);
    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name
    });
    return response.status(201).send();
  }

}

exports.UploadCarImagesController = UploadCarImagesController;