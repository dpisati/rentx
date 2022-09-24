"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListSpecificationUseCase = void 0;

var _ISpecificationRepository = require("@modules/cars/repositories/ISpecificationRepository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let ListSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("SpecificationsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISpecificationRepository.ISpecificationsRepository === "undefined" ? Object : _ISpecificationRepository.ISpecificationsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListSpecificationUseCase {
  constructor(specificationRepository) {
    this.specificationRepository = specificationRepository;
  }

  async execute() {
    return await this.specificationRepository.list();
  }

}) || _class) || _class) || _class) || _class);
exports.ListSpecificationUseCase = ListSpecificationUseCase;