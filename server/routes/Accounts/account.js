import { Router } from "express";
const accRouter = Router();
import {
  getAllAccounts,
  createNewAccount,
  deleteAccount,
  updateAccount,
} from "../../controller/Accounts/account.js";
import { checkForUser } from "../../middleware/checkIfUserExist.js";

accRouter.get("/account", checkForUser, getAllAccounts);
accRouter.post("/account", checkForUser, createNewAccount);
accRouter.delete("/account", checkForUser, deleteAccount);
accRouter.patch("/account", checkForUser, updateAccount);

export default accRouter;
