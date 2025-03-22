import { query } from "../utils/db.js";

export const checkForUser = async (req, res, next) => {
  const user_id =
    req.body.user_id ||
    req.query.user_id ||
    req.params.user_id ||
    req.body.account_user_id; // Check all locations

  let cursor;
  if (!user_id) {
    return res.status(400).json({ error: "User ID required." });
  }

  cursor = await query("SELECT * from users where user_id=$1", [user_id]);
  if (cursor.length === 0) {
    return res.status(400).json({ error: "User Not found." });
  }
  req.user = cursor[0];
  next();
};
