import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

import bcrypt from "bcryptjs";
import { createJWT, verifyJWT } from "../utils/JWT.js";
import conn from "../utils/DB.js";

const insertTransaction = async function (req, res, next) {
  let query;
  const {
    transaction_type,
    transaction_date,
    transaction_amount,
    transaction_description,
    transaction_category,
    ...transaction_account
  } = req.body;

  //Get Acc id from master
  let somw
  // throw error if acc does not exist

  query = `select count(*) as acc_id_count from account_master where acc_id='${transaction_account.transaction_account_from_id}'  and acc_user_id=?`;
  const [from_acc_id] = await conn.execute(query,[req.currentuser.uid]);

    if(from_acc_id[0].acc_id_count == 0){
      return res.status(400).json({ message: "Account does not exist" });
    }


  if(transaction_account?.transaction_account_to ){
    query = `select count(*) as acc_id_count from account_master where acc_id='${transaction_account.transaction_account_to_id}'  and acc_user_id=?`;
    
    let [results, feilds] = await conn.execute(query,[req.currentuser.uid]);

  if(results[0].acc_id_count == 0){
      return res.status(400).json({ message: "To Account does not exist" });
    }
  }
  

  try {
    query =
      "INSERT INTO TRANSACTIONS (amount,category,type,date,description, from_trn_acc_id,to_trn_Acc_id,by_user) VALUES (?,?,?,?,?,?,?,?)";

    let [results, feilds] = await conn.execute(query, [
      transaction_amount,
      transaction_category,
      transaction_type,
      transaction_date,
      transaction_description,
      transaction_account.transaction_account_from_id,
      transaction_account.transaction_account_to_id?? null,
      req.currentuser.uid,
    ]);

    res.status(201).json({ ok: true, message: "Inserted Sucessfully" });
  } catch (error) {
    res.status(401).json({ ok: false, message: error.message });
  }
};


const updateAccountBalance = async function(req,res,next){
  let query;

  const { account_name, account_balance, account_type } = req.body;

  query = `SELECT acd_acc_id,acd_available_balance FROM account_details WHERE lower(acd_acc_name) = lower('${account_name}') AND lower(acd_acc_type) = lower('${account_type}')`;

  let [account_details] = await conn.execute(query);

  if(account_details.length<=0){
    res.status(401).json({ ok: false, message: "Account does not exist"});
  }

    //update with available balance + new balance
    query = `UPDATE account_details
    SET acd_available_balance= ${
      account_details[0].acd_available_balance
    }+${Number(account_balance)}
    where acd_acc_id=?`;
    try {
    let [data] = await conn.execute(query, [account_details[0].acd_acc_id]);
    res.status(201).json({ ok: true, message: "Balance Updated" });
    } catch (error) {
      res.status(401).json({ ok: false, message: "Error while updating"});
    }

}
const insertAccount = async function (req, res, next) {
  let query;

  const { account_name, account_balance, account_type } = req.body;

  //Check if acc already exists
  query = `SELECT  acc_id FROM account_master WHERE lower(acc_name) = lower('${account_name}') AND lower(acc_type) = lower('${account_type}')`;

  try {
    let [acc_exist] = await conn.execute(query);

    if(acc_exist[0]){
      return res.status(401).json({ ok: false, message: "Account with same name already exists"});
    }
      query = "INSERT INTO account_master (acc_name,acc_type,acc_user_id) VALUES (?,?,?)";

      let [acm_results, feilds] = await conn.execute(query, [
        account_name,
        account_type,
        req.currentuser.uid,
      ]);

      query = `INSERT INTO ACCOUNT_DETAILS(acd_acc_id, acd_acc_name,acd_acc_type,acd_user_id,acd_available_balance)values(?,?,?,?,?)`;

      let [results] = await conn.execute(query, [
        acm_results.insertId,
        account_name,
        account_type,
        req.currentuser.uid,
        Number(account_balance)
      ]);

      res.status(201).json({ ok: true, message: "Account Created" });
  
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

const getAccList = async function (req, res, next) {
  let query;
  try {
    let [results, fields] = await conn.execute(
      "SELECT * FROM account_master where acc_user_id=?",
      [req.currentuser.uid]
    );

    res.status(200).json({ ok: true, message: "Success", result: results });
  } catch (error) {
    res.status(400).json({ ok: false, message: error.message });
  }
};

const filterTransaction = async function (req, res, next) {
  let {
    category = null,
    type = null,
    startDate = null,
    endDate = null,
  } = req.body;
  let query;
  let isFirstQuery = true;

  let filterQuery = `SELECT * FROM TRANSACTIONS WHERE BY_USER=${req.currentuser.uid}`;

  if (category !== null && category !== "Category") {
    filterQuery += ` AND LOWER(category)=LOWER('${category.slice(2).trim()}')`;
  }

  if (type !== null) {
    filterQuery += ` AND LOWER(type)=LOWER('${type}')`;
  }
  //If any one is null
  if (startDate !== null || endDate !== null) {
    if (startDate == null || endDate === null) {
      if (startDate !== null) {
        //append only start date
        filterQuery += ` and date >= '${startDate}'`;
      } else {
        //append only end date
        filterQuery += ` and date <= '${endDate}'`;
      }
    } else {
      //between both date
      filterQuery += ` and date BETWEEN '${startDate}' AND '${endDate}'`;
    }
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
  insertAccount,
  updateAccountBalance,
  getAccList
};
