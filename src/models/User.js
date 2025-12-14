const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    city: { type: String, required: true}
}, { _id: true });

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    favorites: [FavoriteSchema],
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);