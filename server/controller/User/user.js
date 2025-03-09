import { query } from "../../utils/db.js";

// Function to get all users
const getUsers = async (req, res) => {
  try {
    const cursor = await query("SELECT * FROM users");
    if (cursor.length === 0) {
      return res.status(400).json({ error: "No users present" });
    }

    res.status(200).json({ data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error getting users:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

const findUser = async (req, res) => {
  const { filter } = req.body;
  let cursor;
  try {
    const whereClause = Object.keys(filter)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(" AND ");

    // Create values array for parameterized query
    const values = Object.values(filter);
    // Add userId as the last parameter

    // SQL query
    const sqlQuery = `SELECT * FROM users  WHERE  ${whereClause};`;
    cursor = await query(sqlQuery, values);

    res.status(200).json({ data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error getting users:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};
// Function to insert a new user
const createUser = async (req, res) => {
  const { user_name, user_email, user_password } = req.body;
  let cursor;
  try {
    cursor = await query(
      "SELECT * FROM users where user_name=$1 AND user_email=$2",
      [user_name, user_email]
    );
    if (cursor.length > 0) {
      return res.status(400).json({ error: "User already exist" });
    }

    cursor = await query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [user_name, user_email, user_password]
    );
    res.status(200).json({ data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error getting users:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Function to get a user by ID
const getUserById = async (req, res) => {
  const { userId } = req.body;
  const response = await query("SELECT * FROM users WHERE user_id = $1", [
    userId,
  ]);
  res.json(response);
};

const updateUser = async (req, res) => {
  try {
    const { user_id, fieldsToBeUpdated } = req.body;

    if (
      !user_id ||
      !fieldsToBeUpdated ||
      Object.keys(fieldsToBeUpdated).length === 0
    ) {
      return res
        .status(400)
        .json({ error: "User ID and at least one field are required." });
    }

    // Dynamically generate SET clause
    const setClause = Object.keys(fieldsToBeUpdated)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    // Create values array for parameterized query
    const values = Object.values(fieldsToBeUpdated);
    values.push(user_id); // Add userId as the last parameter

    // SQL query
    const sqlQuery = `UPDATE users SET ${setClause} WHERE user_id = $${values.length} RETURNING *;`;

    // Execute query
    const response = await query(sqlQuery, values);

    if (response.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(response[0]); // Return updated user
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

const removeUserId = async (req, res) => {
  const { userId } = req.body;
  const response = await query("DELETE FROM users WHERE user_id = $1", [
    userId,
  ]);
  res.json(response);
};

export {
  getUsers,
  createUser,
  getUserById,
  removeUserId,
  updateUser,
  findUser,
};
