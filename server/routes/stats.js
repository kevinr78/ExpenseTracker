import { getStats } from "../controller/Transaction/stats.js";

import { Router } from "express";
import { checkForUser } from "../middleware/checkIfUserExist.js";
const statsRouter = Router();

statsRouter.get("/stat", checkForUser, getStats);

export default statsRouter;
