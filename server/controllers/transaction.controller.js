import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import { json } from "react-router-dom";
import bcrypt from "bcryptjs";
import { createJWT, verifyJWT } from "../utils/JWT.js";
import conn from "../utils/DB.js";
const insertTransaction = async function (req, res, next) {
  let query;
  const { amount, category, type, description, date } = req.body;
  try {
    query =
      "INSERT INTO TRANSACTIONS (amount,category,type,date,description, by_user) VALUES (?,?,?,?,?,?)";

    let [results, feilds] = await conn.execute(query, [
      amount,
      category,
      type,
      date,
      description,
      req.currentuser.uid,
    ]);

    res.status(201).json({ ok: true, message: "Inserted Sucessfully" });
  } catch (error) {
    res.status(401).json({ ok: false, message: error.message });
  }
};

const getAllTransactions = async function (req, res, next) {
  let query;
  try {
    let [results, fields] = await conn.execute(
      "SELECT * FROM transactions where by_user=? ORDER BY created_at DESC",
      [req.currentuser.uid]
    );

    res.status(200).json({ ok: true, message: "Success", result: results });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

const filterTransaction = async function (req, res, next) {
  const { category, type, startDate, endDate } = req.body;
  let query;
  let isFirstQuery = true;
  let filterQuery = "SELECT * FROM TRANSACTIONS ";

  if (category !== null && category !== "Category") {
    if (isFirstQuery) {
      filterQuery += `WHERE LOWER(category)=LOWER('${category
        .slice(2)
        .trim()}')`;
      isFirstQuery = false;
    } else {
      filterQuery += ` AND LOWER(category)=LOWER('${category
        .slice(2)
        .trim()}')`;
    }
  }

  if (type !== null) {
    if (isFirstQuery) {
      filterQuery += `WHERE LOWER(type)=LOWER('${type}')`;
      isFirstQuery = false;
    } else {
      filterQuery += ` AND LOWER(type)=LOWER('${type}')`;
    }
  }

  if (startDate !== null && endDate !== null) {
    if (isFirstQuery) {
      filterQuery += `WHERE date BETWEEN '${startDate}' AND '${endDate}'`;
      isFirstQuery = false;
    } else {
      filterQuery += ` and date BETWEEN '${startDate}' AND '${endDate}'`;
    }

    filterQuery += ` AND BY_USER=${req.currentuser.uid};`;
  }
  try {
    let [results, fields] = await conn.query(filterQuery, [
      category,
      type,
      startDate,
      endDate,
    ]);
    res.status(200).json({ ok: true, message: "Success", result: results });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

const getExpenseSummary = async function (req, res, next) {
  try {
    let [results, fields] = await conn.execute(
      `select "income",ifnull(sum(amount),0 )AS Summary 
    from transactions
     where type=?
     and by_user=?
     union
    select "expense",sum(amount) AS Summary 
    from transactions
     where type=? 
     and by_user=?
     group by type;`,
      ["income", req.currentuser.uid, "expense", req.currentuser.uid]
    );

    res.status(200).json({ ok: true, message: "Success", result: results });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
};
export {
  insertTransaction,
  getAllTransactions,
  filterTransaction,
  getExpenseSummary,
};
