import { Router } from "express";
import {
  getAllTransactions,
  deleteTransaction,
  addNewTransaction,
  updateTransaction,
} from "../../controller/Transaction/transaction.js";

import { checkForUser } from "../../middleware/checkIfUserExist.js";
const transactionRouter = Router();

transactionRouter.get("/transaction", checkForUser, getAllTransactions);
transactionRouter.post("/transaction", checkForUser, addNewTransaction);
transactionRouter.delete("/transaction", checkForUser, deleteTransaction);
transactionRouter.patch("/transaction", checkForUser, updateTransaction);

export default transactionRouter;
