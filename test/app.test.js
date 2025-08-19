import request from "supertest"
import mongoose from "mongoose"
import app from "../app.js"

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/testdb")
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe("User API", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123"
    })

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty("message", "User registered successfully")
  })
})
