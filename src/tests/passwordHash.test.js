const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

beforeAll(async () => {
    const uri =process.env.MONGO_URI;
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('Password hashing', () => {
    test('Tjekker hashing af passwords', async () => {
        const email = `hash@gmail.com`;
        const plain = 'MonnerErBedreEndKaffe';

        const hashed = await bcrypt.hash(plain, 10);

        const user = new User({ email, password: hashed, favorites: [] });
        await user.save();

        const loaded = await User.findOne({ email }).lean();
        expect(loaded).toBeDefined();
        expect(loaded.password).toBeDefined();
        expect(loaded.password).not.toBe(plain);
        expect(loaded.password.length).toBeGreaterThan(20);

    });
});