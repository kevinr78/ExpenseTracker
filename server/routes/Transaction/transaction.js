import { Router } from "express";
import {
  getAllTransactions,
  deleteTransaction,
  addNewTransaction,
} from "../../controller/Transaction/transaction.js";
const transactionRouter = Router();

transactionRouter.get("/allTransactions", getAllTransactions);
transactionRouter.post("/newTransaction", addNewTransaction);
transactionRouter.delete("/removeTransaction", deleteTransaction);

export default transactionRouter;
