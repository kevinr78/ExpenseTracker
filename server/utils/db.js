import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const connectDB = async () => {
  try {
    await pool.query("SELECT 1"); // Simple query to check connection
    console.log("✅ PostgreSQL Database Connected");
  } catch (error) {
    console.error("❌ Database Connection Error:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

const query = async (text, params) => {
  const client = await pool.connect(); // Get a client from the pool
  try {
    const result = await client.query(text, params); // Execute the query
    return result.rows; // Return only the rows
  } catch (error) {
    console.error("Database Query Error:", error.message);
    throw error;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

export { connectDB, pool, query };
