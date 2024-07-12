import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { json } from "react-router-dom";
import bcrypt from "bcryptjs";
import { createJWT, verifyJWT } from "./utils/JWT.js";
import "dotenv/config";
import AuthRouter from "./routes/auth.route.js";
import TransactionRouter from "./routes/transaction.route.js";
import "./utils/DB.js";

const app = express();
debugger;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", AuthRouter);
app.use("/", TransactionRouter);

app.use((err, req, res, next) => {
  return res.status(err.status || 500).send({
    message: err.message || "Something went wrong",
    status: err.status || 500,
    ok: err.ok || 0,
  });
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
