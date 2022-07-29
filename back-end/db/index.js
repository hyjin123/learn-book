const pg = require("pg");
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;

// used in development
// const client = new pg.Client({
//   connectionString: connectionString || process.env.DATABASE_URL,
// });

// used in production
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

console.log(`Connected to ${process.env.DB_NAME} on ${process.env.DB_HOST}`);
client.connect();

module.exports = client;
