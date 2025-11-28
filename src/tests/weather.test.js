const request = require('supertest');
const app = require("/app");

describe("GET /api/weather", () => {
    test("Should return data as JSON", async () => {
        const res = await request(app).get("/api/weather?city=Slagelse");

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("temperature");
        expect(res.body).toHaveProperty("wind");
        expect(res.body).toHaveProperty("description");
    });

    test("Should return 400 if city is not found", async () => {
        const res = await request(app).get("/api/weather");

        expect(res.status).toBe(400);
    });

});
