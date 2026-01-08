const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,              // important
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});


pool.on("connect", () => {
  console.log("✅ Database connected successfully");
});

module.exports = pool;
