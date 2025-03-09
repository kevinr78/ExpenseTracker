import { Router } from "express";
const accRouter = Router();
import {
  getAllAccounts,
  createNewAccount,
  deleteAccount,
  updateAccount,
} from "../../controller/Accounts/account.js";

accRouter.get("/allAccounts", getAllAccounts);
accRouter.post("/addAccount", createNewAccount);
accRouter.delete("/removeAccount", deleteAccount);
accRouter.patch("/updateAccount", updateAccount);

export default accRouter;
