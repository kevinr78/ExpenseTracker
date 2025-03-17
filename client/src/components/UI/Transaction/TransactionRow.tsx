import React from "react";
import { Transaction } from "../../../store/TransactionContext";
export default function TransactionRow({
  transaction_account,
  transaction_amount,
  transaction_category,
  transaction_date,
  transaction_type,
  transaction_id,
}: Transaction) {
  return (
    <tr data-id={transaction_id}>
      <th>
        <label>
          <input type="checkbox" className="checkbox checkbox-sm" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold">{transaction_category}</div>
          </div>
        </div>
      </td>
      <td>
        {typeof transaction_date === "string"
          ? transaction_date.split("T")[0]
          : transaction_date.toLocaleDateString()}
        <br />
      </td>
      <td>{transaction_category}</td>
      <td>{transaction_account}</td>
      <td>{transaction_type?.toLowerCase() === "credit" ? "➕" : "➖"}</td>
      <td>{transaction_amount}</td>
    </tr>
  );
}
