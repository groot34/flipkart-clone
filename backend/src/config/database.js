const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 3,                    // VERY IMPORTANT (keep small)
  idleTimeoutMillis: 10000,  // close idle connections fast
  connectionTimeoutMillis: 10000
});

pool.on("connect", () => {
  console.log("✅ Database connected successfully");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected DB error", err);
  process.exit(1);
});

module.exports = pool;
