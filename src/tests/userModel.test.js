const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
});

describe('CRUD til User Model', () => {
    test('Opretter bruger og tilføjer favorit', async () => {
        const email = `crud@gmail.com`;

        const user = new User({
            email,
            password: 'hashPassword',
            favorites: []
        });

        await user.save();

        user.favorites.push({ city: 'Slagelse' });
        await user.save();

        const loaded = await User.findOne({ email }).lean();
        expect(loaded).toBeDefined();
        expect(loaded.favorites.length).toBe(1);
        expect(loaded.favorites[0].city).toBe('Slagelse');
    });

    test('Sletter favorit og bruger', async () => {
        const user = await User.findOne({ email: 'crud@gmail.com' });

        user.favorites = [];
        await user.save();

        const reloaded = await User.findOne({ email: 'crud@gmail.com' }).lean();
        expect(reloaded.favorites.length).toBe(0);

        await User.deleteOne({ _id: user._id });
        const gone = await User.findById(user._id);
        expect(gone).toBeNull();
    });
});
