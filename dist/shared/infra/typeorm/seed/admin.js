"use strict";

var _bcryptjs = require("bcryptjs");

var _uuid = require("uuid");

var _ = _interopRequireDefault(require("../"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function create() {
  const connection = await (0, _.default)("localhost");
  const id = (0, _uuid.v4)();
  const password = await (0, _bcryptjs.hash)("admin", 8);
  await connection.query(`
        INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'AdminName', 'admin@admin.com', '${password}', true, 'now()', '01234')
        
        `);
  await connection.close();
}

create().then(() => console.log("User Admin created!"));