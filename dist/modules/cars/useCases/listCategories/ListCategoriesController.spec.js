"use strict";

var _app = require("@shared/infra/http/app");

var _supertest = _interopRequireDefault(require("supertest"));

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

var _bcryptjs = require("bcryptjs");

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("ListCategoriesController.spec", () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.default)();
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcryptjs.hash)("admin", 8);
    await connection.query(`
          INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
              values('${id}', 'AdminName', 'admin@admin.com', '${password}', true, 'now()', '01234')
          `);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it("should be able to list the categories", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body;
    await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest",
      description: "Category test description"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    const response = await (0, _supertest.default)(_app.app).get("/categories").set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
  });
});