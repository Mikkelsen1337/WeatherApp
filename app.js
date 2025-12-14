require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET || 'd4f2l10001011337EZPZ',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use('/auth', require('./src/routes/authRoutes'));
app.use('/api/favorites', require('./src/routes/favoriteRoutes'));

app.get('/login')

app.use("/api/weather", require("./src/routes/weatherRoutes"));


app.get("/", (req, res) => {
    res.render("index");
});

module.exports = app;
