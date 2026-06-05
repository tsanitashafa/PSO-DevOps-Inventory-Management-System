const request = require("supertest");
const app = require("../app");

describe("Health Check API", () => {
    test("GET /api/v1/health should return success", async () => {
        const response = await request(app).get("/api/v1/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("success");
        expect(response.body.message).toBe("API is running");
    });
});