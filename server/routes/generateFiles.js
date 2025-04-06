import fs from "fs";
import path from "path";
import { checkForUser } from "../middleware/checkIfUserExist.js";
import pdf from "pdf-creator-node"; // assuming you're using this
import { query } from "../utils/db.js"; // your DB utility
import express from "express";
const fileRouter = express.Router();
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fileRouter.get("/generate", checkForUser, async (req, res) => {
  try {
    const type = req.query.type;
    let queryString = "";

    if (type === "Accounts") {
      queryString =
        "  SELECT a.account_id,a.account_name,a.account_status,atm.acc_type_name as account_type, a.account_balance\
      FROM accounts a, account_type_master atm \
      WHERE a.user_id=$1 and a.account_type = atm.acc_type_id ORDER BY account_id";
    } else {
      queryString =
        "select t.transaction_id,t.transaction_date,t.transaction_amount , t.transaction_category, t.transaction_title,\
         t.transaction_type ,a.account_name\
        from transactions t, accounts a\
        where t.transaction_to_account = a.account_id\
        and t.user_id=$1\
        order by t.transaction_date";
    }

    const result = await query(queryString, [req.user.user_id]);

    if (result.length === 0) {
      return res
        .status(200)
        .json({ ok: true, data: [], error: "No accounts found." });
    }

    const filePath =
      type === "Accounts" ? "account_report.html" : "transaction_report.html";
    const templatePath = path.resolve(
      __dirname,
      `../utils/templates/${type}/${filePath}`
    );
    const html = fs.readFileSync(templatePath, "utf8");

    const document = {
      html,
      data: { users: result },
      path: `./utils/templates/${type}/output.pdf`,
      type: "", // empty means it will create the file on disk
    };

    const options = {
      format: "A3",
      orientation: "portrait",
      border: "10mm",
    };

    await pdf.create(document, options);

    // Send file to frontend
    const outputPath = path.resolve(
      __dirname,
      `../utils/templates/${type}/output.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${type}_report.pdf`
    );

    res.download(outputPath, `${type}_report.pdf`); // triggers download
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, error: "Something went wrong generating the PDF." });
  }
});

export default fileRouter;
