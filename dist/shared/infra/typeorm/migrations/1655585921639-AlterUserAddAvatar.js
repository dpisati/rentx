"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserAddAvatar1655585921639 = void 0;

var _typeorm = require("typeorm");

class AlterUserAddAvatar1655585921639 {
  async up(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "avatar",
      type: "varchar",
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn("users", "avatar_url");
  }

}

exports.AlterUserAddAvatar1655585921639 = AlterUserAddAvatar1655585921639;