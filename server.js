// server.js
require("dotenv").config();
const connectDB = require("./src/config/db");
const app = require("./app");

const PORT = process.env.PORT || 3000;

(async () => {
    await connectDB();
    const server = app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });

    server.on("error", (err) => {
        console.error("Server error:", err);
        process.exit(1);
    });
})();