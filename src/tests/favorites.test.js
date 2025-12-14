const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

let cookie;

beforeAll(async () => {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);

    await request(app)
        .post('/auth/register')
        .send({ email: 'fav@test.com', password: '123456' });

    const login = await request(app)
        .post('/auth/login')
        .send({ email: 'fav@test.com', password: '123456' });

    cookie = login.headers['set-cookie'];
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('Favorites CRUD', () => {
    test('Kan ikke hente favoritter uden login', async () => {
        const res = await request(app).get('/api/favorites');
        expect(res.statusCode).toBe(403);
    });

    test('Opret favorit', async () => {
        const res = await request(app)
            .post('/api/favorites')
            .set('Cookie', cookie)
            .send({ city: 'Slagelse' });

        expect(res.statusCode).toBe(201);
        expect(res.body.msg).toBeDefined();
    });

    test('Hent favoritter', async () => {
        const res = await request(app)
            .get('/api/favorites')
            .set('Cookie', cookie);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.favorites)).toBe(true);
        expect(res.body.favorites.length).toBe(1);
        expect(res.body.favorites[0].city).toBe('Slagelse');
    });

    test('Duplicate favorit giver fejl', async () => {
        const res = await request(app)
            .post('/api/favorites')
            .set('Cookie', cookie)
            .send({ city: 'Slagelse' });

        expect(res.statusCode).toBe(400);
    });

    test('Slet favorit', async () => {
        const list = await request(app)
            .get('/api/favorites')
            .set('Cookie', cookie);

        const id = list.body.favorites[0]._id;

        const del = await request(app)
            .delete(`/api/favorites/${id}`)
            .set('Cookie', cookie);

        expect(del.statusCode).toBe(200);
        expect(del.body.msg).toBeDefined();
    });
});
