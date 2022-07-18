import { app } from "@shared/infra/http/app";
import request from "supertest";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

let connection: Connection;

describe("CreateCategoryController.spec", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

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
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category test description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.statusCode).toBe(201);
  });

  it("should not be able to create a category with an existing name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category test description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.statusCode).toBe(400);
  });
});
