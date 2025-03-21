import { query } from "../../utils/db.js";

const getStats = async (req, res, next) => {
  let cursor;
  try {
    let sqlquery = `
    select 'Credit' as expense_type, coalesce(sum(transaction_amount),0) as amount
    from transactions t
    where transaction_type='Credit'
    and transaction_user_id=$1
    and date_trunc('month', transaction_date) = date_trunc('month' , current_timestamp)
    UNION
    select 'Debit' as expense_type, coalesce(sum(transaction_amount),0) as amount
    from transactions t
    where transaction_type='Debit'
    and transaction_user_id=$1
    and date_trunc('month', transaction_date) = date_trunc('month' , current_timestamp)`;
    cursor = await query(sqlquery, [req.user.user_id]);

    res.status(200).json({ ok: true, data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error getting transactions for user", error.message);
    res.status(500).json({ ok: true, error: "Internal server error." });
  }
};

export { getStats };
