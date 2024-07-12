import express from "express";
import {
  insertTransaction,
  getAllTransactions,
  getExpenseSummary,
  filterTransaction,
} from "../controllers/transaction.controller.js";
const router = express.Router();
import { verifyJWT } from "../utils/JWT.js";

router.post("/insertTransaction", verifyJWT, insertTransaction);
router.post("/getAllTransactions", verifyJWT, getAllTransactions);
router.post("/filterTransaction", verifyJWT, filterTransaction);
router.post("/getExpenseSummary", verifyJWT, getExpenseSummary);
router.post("/insertTransaction", verifyJWT, insertTransaction);

export default router;
