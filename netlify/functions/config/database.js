// const { Pool } = require("pg");

// const pool = new Pool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD
// });

// module.exports = pool;

// netlify/functions/config/database.js
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1, // CRITICAL for serverless: prevents connection exhaustion
});

module.exports = pool;