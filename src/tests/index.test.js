const request = require("supertest");
const app = require("/app");


describe("GET / (index side)", () => {
    test("Skal returnere HTML siden med search form", async () => {
        const res = await request(app).get("/");

        expect(res.status).toBe(200);

        expect(res.headers["content-type"]).toMatch("/html");

        expect(res.text).toContain("Vejr oversigt");

    });
});