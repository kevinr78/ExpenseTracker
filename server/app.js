import createHttpError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { connectDB } from "./utils/db.js";
import transactionRouter from "./routes/Transaction/transaction.js";
import userRouter from "./routes/User/user.js";
import accRouter from "./routes/Accounts/account.js";
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/transactions", transactionRouter);
app.use("/accounts", accRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || "3000";
app.set("port", port);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server Started");
  });
});
