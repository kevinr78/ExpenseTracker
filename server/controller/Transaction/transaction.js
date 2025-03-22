import { query } from "../../utils/db.js";

// Function to get all users
const getAllTransactions = async (req, res, next) => {
  let cursor;
  try {
    cursor = await query(
      "SELECT * FROM transactions where transaction_user_id=$1 ORDER BY transaction_date LIMIT 5 ",
      [req.user.user_id]
    );

    res.status(200).json({ ok: true, data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error getting transactions for user", error.message);
    res
      .status(500)
      .json({ ok: false, error: error.message || "Internal server error." });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { transaction_id, fieldsToBeUpdated } = req.body;

    const setClause = Object.keys(fieldsToBeUpdated)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    // Create values array for parameterized query
    const values = Object.values(fieldsToBeUpdated);
    values.push(req.user.user_id); // Add userId as the last parameter
    values.push(transaction_id);

    // SQL query
    const sqlQuery = `UPDATE transactions SET ${setClause} WHERE transaction_user_id = $${
      values.length - 1
    } AND transaction_id=$${values.length} RETURNING *;`;

    // Execute query
    const response = await query(sqlQuery, values);

    res.status(200).json({ ok: true, data: response }); // Return updated user
  } catch (error) {
    console.error("Error adding transactions for user", error.message);
    res.status(500).json({ ok: false, error: "Internal server error." });
  }
};

// Function to insert a new user
const addNewTransaction = async (req, res, next) => {
  const {
    transaction_date,
    transaction_amount,
    transaction_to_account,
    transaction_from_account,
    transaction_category,
    transaction_type,
    transaction_description,
    transaction_title,
  } = req.body;

  try {
    const cursor = await query(
      "INSERT INTO transactions (transaction_date,transaction_amount,transaction_to_account, transaction_category, transaction_type,transaction_user_id,transaction_description,transaction_from_account,transaction_title) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [
        transaction_date,
        transaction_amount,
        transaction_to_account,
        transaction_category,
        transaction_type,
        req.user.user_id,
        transaction_description,
        transaction_from_account,
        transaction_title,
      ]
    );

    res.status(200).json({ ok: true, data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error adding transactions for user", error.message);
    res.status(500).json({ ok: false, error: "Internal server error." });
  }
};

// Function to get a user by ID
const deleteTransaction = async (req, res) => {
  let cursor;
  const { transaction_id } = req.body;
  try {
    cursor = await query(
      "DELETE  FROM transactions WHERE transaction_id = $1 and transaction_user_id=$2",
      [transaction_id, req.user.user_id]
    );

    res.status(200).json({ ok: true, data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error deleting transaction", error.message);
    res
      .status(500)
      .json({ ok: false, error: error.message || "Internal server error." });
  }
};

export {
  deleteTransaction,
  addNewTransaction,
  getAllTransactions,
  updateTransaction,
};
