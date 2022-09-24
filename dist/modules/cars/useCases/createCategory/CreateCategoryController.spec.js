"use strict";

var _app = require("@shared/infra/http/app");

var _supertest = _interopRequireDefault(require("supertest"));

var _typeorm = _interopRequireDefault(require("@shared/infra/typeorm"));

var _bcryptjs = require("bcryptjs");

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe("CreateCategoryController.spec", () => {
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
  it("should be able to create a new category", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest",
      description: "Category test description"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.statusCode).toBe(201);
  });
  it("should not be able to create a category with an existing name", async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin"
    });
    const {
      refresh_token
    } = responseToken.body;
    const response = await (0, _supertest.default)(_app.app).post("/categories").send({
      name: "Category Supertest",
      description: "Category test description"
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    expect(response.statusCode).toBe(400);
  });
});