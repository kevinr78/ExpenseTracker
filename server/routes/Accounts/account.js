import { Router } from "express";
const accRouter = Router();
import {
  getAllAccounts,
  createNewAccount,
  deleteAccount,
  updateAccount,
} from "../../controller/Accounts/account.js";
import { checkForUser } from "../../middleware/checkIfUserExist.js";

accRouter.post("/allAccounts", checkForUser, getAllAccounts);
accRouter.post("/addAccount", checkForUser, createNewAccount);
accRouter.delete("/removeAccount", checkForUser, deleteAccount);
accRouter.patch("/updateAccount", checkForUser, updateAccount);

export default accRouter;
