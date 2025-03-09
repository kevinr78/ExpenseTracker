import { query } from "../../utils/db.js";

// Function to get all users
const getAllTransactions = async (req, res, next) => {
  const resp = await query("SELECT * FROM transactions");

  res.json(resp);
};

// Function to insert a new user
const addNewTransaction = async (req, res, next) => {
  const { trans_date, trans_amount, trans_acc, trans_category } = req.body;

  const resp = await query(
    "INSERT INTO transactions (transaction_date,transaction_amount,transaction_account, transaction_category) VALUES ($1, $2, $3,$4) RETURNING *",
    [trans_date, trans_amount, trans_acc, trans_category]
  );

  res.json(resp);
};

// Function to get a user by ID
const deleteTransaction = async (transaction_id) => {
  return await query("DELETE  FROM transactions WHERE transaction_id = $1", [
    transaction_id,
  ]);
};

export { deleteTransaction, addNewTransaction, getAllTransactions };
