import { query } from "../../utils/db.js";

// Function to get all users
const getAllTransactions = async (req, res, next) => {
  let cursor;
  try {
    if (req.query.mode === "filter") {
      let baseQuery = "SELECT * FROM transactions WHERE user_id=$1 AND ";
      const whereConditions = [];
      const entries = Object.entries(req.query);
      const values = [req.user.user_id];

      entries.forEach(([key, value], index) => {
        if (key === "mode") return;
        if (key === "transaction_title") {
          whereConditions.push(`${key} LIKE $${values.length + 1}`);
          values.push(`%${value}%`);
        } else if (key === "min_amount") {
          whereConditions.push(`transaction_amount >= $${values.length + 1}`);
          values.push(value);
        } else if (key === "max_amount") {
          whereConditions.push(`transaction_amount <= $${values.length + 1}`);
          values.push(value);
        } else if (key === "start_date") {
          whereConditions.push(`transaction_date >= $${values.length + 1}`);
          values.push(value);
        } else if (key === "end_date") {
          whereConditions.push(`transaction_date <= $${values.length + 1}`);
          values.push(value);
        } else {
          whereConditions.push(`${key} = $${values.length + 1}`);
          values.push(value);
        }
      });

      if (whereConditions.length > 0) {
        baseQuery += whereConditions.join(" AND ");
        baseQuery += " ORDER BY transaction_date desc ";
        cursor = await query(baseQuery, values);
      }
    } else {
      cursor = await query(
        "SELECT * FROM transactions where user_id=$1 ORDER BY transaction_date desc LIMIT 5 ",
        [req.user.user_id]
      );
    }

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
    const sqlQuery = `UPDATE transactions SET ${setClause} WHERE user_id = $${
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
      "INSERT INTO transactions (transaction_date,transaction_amount,transaction_to_account, transaction_category, transaction_type,user_id,transaction_description,transaction_from_account,transaction_title) VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9) RETURNING *",
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
      "DELETE  FROM transactions WHERE transaction_id = $1 and user_id=$2",
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
