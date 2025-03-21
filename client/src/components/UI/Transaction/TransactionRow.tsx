import React from "react";
import { Transaction } from "../../../store/TransactionContext";
export default function TransactionRow({
  transaction_to_account,
  transaction_amount,
  transaction_category,
  transaction_date,
  transaction_type,
  transaction_id,
  transaction_title,
}: Transaction) {
  return (
    <tr data-id={transaction_id}>
      <th></th>
      <td>
        <div className="flex items-center gap-3">
          <div>
            <div className="font-bold">{transaction_title}</div>
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
      <td>{transaction_to_account}</td>
      <td>
        {transaction_type?.toLowerCase() === "credit"
          ? "➕"
          : transaction_type?.toLowerCase() === "debit"
          ? "➖"
          : "➡️"}
      </td>
      <td>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(Number(transaction_amount))}
      </td>
      <td className="flex gap-2">
        <button className="btn btn-sm btn-circle btn-outline btn-error">
          X
        </button>
        <button className="btn btn-sm btn-circle btn-outline btn-info">
          E
        </button>
      </td>
    </tr>
  );
}
