import { Router } from "express";
import {
  getAllTransactions,
  deleteTransaction,
  addNewTransaction,
  updateTransaction,
} from "../../controller/Transaction/transaction.js";

import { checkForUser } from "../../middleware/checkIfUserExist.js";
const transactionRouter = Router();

transactionRouter.post("/allTransactions", checkForUser, getAllTransactions);
transactionRouter.post("/newTransaction", checkForUser, addNewTransaction);
transactionRouter.delete("/removeTransaction", checkForUser, deleteTransaction);
transactionRouter.post("/updateTransaction", checkForUser, updateTransaction);

export default transactionRouter;
