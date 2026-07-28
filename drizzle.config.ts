require("dotenv").config();

module.exports = {
    schema: "./src/models/schema.js",
    out: "./drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: { url: process.env.DATABASE_URL }
};