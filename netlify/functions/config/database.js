const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1, // CRITICAL for serverless: prevents connection exhaustion
});

module.exports = pool;