import { app } from "@shared/infra/http/app";
import request from "supertest";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

let connection: Connection;

describe("ListCategoriesController.spec", () => {
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

  it("should be able to list the categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category test description",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(app)
      .get("/categories")
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category Supertest");
  });
});
