import { Router } from "express";
const userRouter = Router();
import {
  getUserById,
  createUser,
  removeUserId,
  getUsers,
  updateUser,
  findUser,
} from "../../controller/User/user.js";

userRouter.get("/allUsers", getUsers);
userRouter.post("/addUser", createUser);
userRouter.post("/findUser", findUser);
userRouter.delete("/removeUser", removeUserId);
userRouter.patch("/updateUser", updateUser);

export default userRouter;
