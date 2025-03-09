import { query } from "../../utils/db.js";

const getAllAccounts = async (req, res, next) => {
  const { user_id } = req.body;
  let cursor;
  try {
    if (!user_id) {
      return res.status(400).json({ error: "User ID required." });
    }

    cursor = await query("SELECT * from users where user_id=$1", [user_id]);
    if (cursor.length === 0) {
      return res.status(400).json({ error: "User Not found." });
    }

    cursor = await query("SELECT * FROM accounts WHERE account_user_id=$1", [
      user_id,
    ]);
    if (cursor.length === 0) {
      return res.status(404).json({ error: "No accounts found." });
    }

    res.status(200).json({ data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error getting accounts account:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

const createNewAccount = async (req, res, next) => {
  const {
    user_id,
    account_name,
    account_type,
    account_starting_balance,
    account_status,
  } = req.body;
  let cursor;
  try {
    if (!user_id) {
      return res.status(400).json({ error: "User ID required." });
    }

    cursor = await query("SELECT * from users where user_id=$1", [user_id]);
    if (cursor.length === 0) {
      return res.status(400).json({ error: "User Not found." });
    }

    cursor = await query(
      "SELECT COUNT(*) AS num_of_accounts from accounts where account_user_id=$1 AND account_name=$2 AND account_type=$3",
      [user_id, account_name, account_type]
    );
    if (cursor[0].num_of_accounts != 0) {
      return res.status(400).json({ error: "Account already exists" });
    }

    cursor = await query(
      "INSERT into accounts(account_name,account_type,account_starting_balance, account_status,account_user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [
        account_name,
        account_type,
        account_starting_balance,
        account_status,
        user_id,
      ]
    );

    res.status(200).json({ data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error adding accounts:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

const deleteAccount = async (req, res) => {
  const { user_id, account_id } = req.body;
  let cursor;
  try {
    if (!user_id) {
      return res.status(400).json({ error: "User ID required." });
    }

    cursor = await query("SELECT * from users where user_id=$1", [user_id]);
    if (cursor.length === 0) {
      return res.status(400).json({ error: "User Not found." });
    }

    cursor = await query("SELECT * FROM accounts where account_id=$1", [
      account_id,
    ]);

    if (cursor.length === 0) {
      return res.status(400).json({ error: "Account Not found." });
    }

    cursor = await query(
      "DELETE FROM accounts where account_id=$1 AND account_user_id=$2",
      [account_id, user_id]
    );

    res.status(200).json({ data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error adding accounts:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};
const updateAccount = async (req, res) => {
  try {
    const { user_id, account_id, fieldsToBeUpdated } = req.body;

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
    values.push(account_id);

    // SQL query
    const sqlQuery = `UPDATE accounts SET ${setClause} WHERE account_user_id = $${
      values.length - 1
    } AND account_id=$${values.length} RETURNING *;`;

    // Execute query
    const response = await query(sqlQuery, values);

    if (response.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(response[0]); // Return updated user
  } catch (error) {
    console.error("Error updating account:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

export { getAllAccounts, createNewAccount, deleteAccount, updateAccount };
