require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.json());

// Routes
app.use("/api/weather", require("./src/routes/weatherRoutes"));

// Simple root for manual test
app.get("/", (req, res) => {
    res.render("index");
});

module.exports = app;
