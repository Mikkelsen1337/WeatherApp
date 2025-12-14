const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('Auth', () => {
    test('Registrer en bruger', async () => {
        const res = await request(app).post('/auth/register').send({ email: 'test@gmail.com', password: '123jegersej456Monsterholdermigigang'});
        expect(res.statusCode).toBe(201);
    });
    test('login', async () => {
        const res = await request(app).post('/auth/login').send({ email: 'test@gmail.com', password: '123jegersej456Monsterholdermigigang'});
        expect(res.statusCode).toBe(200);
    });
});