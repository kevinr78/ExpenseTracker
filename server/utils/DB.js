import mysql from "mysql2/promise";

const connectDB = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
/*   if (!connect) {
    console.log("Error connecting to database");
    throw new Error("Error while connecting to DB");
  } */

connectDB.connect((err) => {
  if (err) {
    console.log("Error connecting to database");
    throw new Error("Error while connecting to DB");
  }
  console.log("Connected to DB");
});

export default connectDB;
