import { query } from "../../utils/db.js";

const getStats = async (req, res, next) => {
  let cursor;
  try {
    let sqlquery = `select t.transaction_type ,sum(transaction_amount) 
        from transactions t
        where transaction_user_id=$1
        and date_trunc('month', transaction_date) = date_trunc('month' , current_timestamp)
        group by t.transaction_type;`;
    cursor = await query(sqlquery, [req.user.user_id]);

    res.status(200).json({ data: cursor }); // Return updated user
  } catch (error) {
    console.error("Error getting transactions for user", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

export { getStats };
