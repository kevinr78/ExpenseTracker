import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

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
  let { category=null, type=null, startDate=null, endDate=null } = req.body;
  let query;
  let isFirstQuery = true;
  
  let filterQuery = `SELECT * FROM TRANSACTIONS WHERE BY_USER=${req.currentuser.uid}`;
  
  if (category !== null && category !== "Category") {
      filterQuery += ` AND LOWER(category)=LOWER('${category
        .slice(2)
        .trim()}')`;
  }
  
  if (type !== null) {
      filterQuery += ` AND LOWER(type)=LOWER('${type}')`;
  }
  //If any one is null 
  if (startDate === null || endDate == null ) {
    if(startDate!==null){
      //append only start date
        filterQuery += ` and date >= '${startDate}'`;
      
    }else{    
      //append only end date
        filterQuery += ` and date <= '${endDate}'`;
      }
  
  }else{
      //between both date
      filterQuery += ` and date BETWEEN '${startDate}' AND '${endDate}'`;
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
