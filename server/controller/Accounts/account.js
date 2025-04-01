import { query } from "../../utils/db.js";

const getAllAccounts = async (req, res, next) => {
  let cursor;
  try {
    cursor = await query(
      "SELECT a.account_id,a.account_name,a.account_status,atm.acc_type_name as account_type, a.account_balance\
      FROM accounts a, account_type_master atm \
      WHERE a.user_id=$1 and a.account_type = atm.acc_type_id ORDER BY account_id LIMIT 5",
      [req.user.user_id]
    );
    if (cursor.length === 0) {
      return res
        .status(200)
        .json({ ok: true, data: cursor, error: "No accounts found." });
    }

    res.status(200).json({ ok: true, data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error getting accounts account:", error.message);
    res.status(500).json({ ok: false, error: "Internal server error." });
  }
};

const getAccountType = async (req, res, next) => {
  let cursor;
  try {
    cursor = await query(
      "SELECT DISTINCT acc_type_name, acc_type_id FROM account_type_master"
    );
    if (cursor.length === 0) {
      return res
        .status(200)
        .json({ ok: true, data: cursor, error: "No account types found." });
    }
    res.status(200).json({ ok: true, data: cursor });
  } catch (error) {
    console.error("Error getting account types:", error.message);
    res.status(500).json({ ok: false, error: "Internal server error." });
  }
};
const getFilteredAccounts = async (req, res, next) => {
  let cursor;

  let baseQuery =
    "  SELECT \
    a.account_id, \
    a.account_name, \
    a.account_status, \
    atm.acc_type_name AS account_type, \
    a.account_balance \
  FROM accounts a \
  JOIN account_type_master atm ON a.account_type = atm.acc_type_id  ";

  const entries = Object.entries(req.query);
  const values = [];
  const whereConditions = [];

  // Handle normal filters
  entries.forEach(([key, value], index) => {
    if (key === "minBalance") {
      whereConditions.push(`a.account_balance >= $${values.length + 1}`);
      values.push(value);
    } else if (key === "maxBalance") {
      whereConditions.push(`a.account_balance <= $${values.length + 1}`);
      values.push(value);
    } else {
      whereConditions.push(`a.${key} = $${values.length + 1}`);
      values.push(value);
    }
  });

  // Append WHERE clause if filters exist
  if (whereConditions.length > 0) {
    baseQuery += ` WHERE ${whereConditions.join(" AND ")}`;
  }
  console.log(baseQuery);

  try {
    cursor = await query(baseQuery, values);
    if (cursor.length === 0) {
      return res
        .status(200)
        .json({ ok: true, data: cursor, error: "No accounts found." });
    }
    console.log(cursor);
    res.status(200).json({ ok: true, data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error getting accounts account:", error.message);
    res.status(500).json({ ok: false, error: "Internal server error." });
  }
};

const createNewAccount = async (req, res, next) => {
  const { account_name, account_type, account_balance, account_status } =
    req.body;
  let cursor;
  try {
    console.log(
      typeof account_name,
      typeof account_type,
      typeof account_balance,
      typeof account_status
    );
    cursor = await query(
      "SELECT COUNT(*) AS num_of_accounts from accounts where user_id=$1 AND account_name=$2 AND account_type=$3",
      [req.user.user_id, account_name, Number(account_type)]
    );
    if (cursor.length && cursor[0].num_of_accounts != 0) {
      return res
        .status(400)
        .json({ ok: false, error: "Account already exists" });
    }

    cursor = await query(
      "INSERT into accounts(account_name,account_type,account_balance, account_status,user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [
        account_name,
        Number(account_type),
        account_balance,
        account_status,
        req.user.user_id,
      ]
    );

    res.status(200).json({ ok: true, data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error adding accounts:", error.message);
    res.status(500).json({ ok: false, error: "Internal server error." });
  }
};

const deleteAccount = async (req, res) => {
  const { user_id, account_id } = req.body;
  let cursor;
  try {
    cursor = await query("SELECT * FROM accounts where account_id=$1", [
      account_id,
    ]);

    if (cursor.length === 0) {
      return res.status(400).json({ ok: false, error: "Account Not found." });
    }

    cursor = await query(
      "DELETE FROM accounts where account_id=$1 AND user_id=$2",
      [account_id, req.user.user_id]
    );

    res.status(200).json({ ok: true, data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error adding accounts:", error.message);
    res.status(500).json({ ok: false, error: "Internal server error." });
  }
};
const updateAccount = async (req, res) => {
  try {
    const { account_id, fieldsToBeUpdated } = req.body;
    console.log(fieldsToBeUpdated);
    if (
      !req.user.user_id ||
      !fieldsToBeUpdated ||
      Object.keys(fieldsToBeUpdated).length === 0
    ) {
      return res.status(400).json({
        ok: false,
        error: "User ID and at least one field are required.",
      });
    }

    if (fieldsToBeUpdated.account_balance !== undefined) {
      // Fetch the current account_balance
      const currentBalanceResult = await query(
        "SELECT account_balance FROM accounts WHERE account_id = $1 AND user_id = $2",
        [account_id, req.user.user_id]
      );

      if (currentBalanceResult.length === 0) {
        return res.status(404).json({ ok: false, error: "Account not found." });
      }

      const currentBalance = currentBalanceResult[0].account_balance;

      // Add the new balance to the existing balance
      fieldsToBeUpdated.account_balance =
        currentBalance + parseInt(fieldsToBeUpdated.account_balance);
    }

    // Dynamically generate SET clause
    const setClause = Object.keys(fieldsToBeUpdated)
      .map((key, index) => `${key} = $${index + 1}`)
      .join(", ");

    // Create values array for parameterized query
    const values = Object.values(fieldsToBeUpdated);

    values.push(req.user.user_id); // Add userId as the last parameter
    values.push(account_id);

    // SQL query
    const sqlQuery = `UPDATE accounts SET ${setClause} WHERE user_id = $${
      values.length - 1
    } AND account_id=$${values.length} RETURNING *;`;

    // Execute query
    const response = await query(sqlQuery, values);

    if (response.length === 0) {
      return res.status(404).json({ ok: false, error: "User not found." });
    }

    res.status(200).json({ ok: true, data: response[0] }); // Return updated user
  } catch (error) {
    console.error("Error updating account:", error.message);
    res.status(500).json({ ok: false, error: "Internal server error." });
  }
};

export {
  getAllAccounts,
  createNewAccount,
  deleteAccount,
  updateAccount,
  getAccountType,
  getFilteredAccounts,
};
