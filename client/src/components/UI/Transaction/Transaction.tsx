import ItemNavbar from "../Navbar/ItemNavbar";
import { ModalProps } from "../../../types/types";
import { useTransactionContext } from "../../../store/TransactionContext";
import TransactionRow from "./TransactionRow";
import { useEffect } from "react";

export default function Transaction({ modalAction }: ModalProps) {
  const { transactions, fetchTransactions, addTransaction } =
    useTransactionContext();
  useEffect(() => {
    fetchTransactions();
  }, [addTransaction]);
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <div className="p-4 pb-2 text-xs  tracking-wide sticky top-0 z-10 bg-base-100">
        <ItemNavbar type="Transactions" action={modalAction} />
      </div>
      <table className="table ">
        {/* head */}
        <thead className="bg-base-300">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Date</th>
            <th>Category</th>
            <th>Card</th>
            <th>Type</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((trans) => {
              return (
                <TransactionRow
                  key={trans.transaction_id}
                  transaction_account={trans.transaction_account}
                  transaction_amount={trans.transaction_amount}
                  transaction_category={trans.transaction_category}
                  transaction_date={trans.transaction_date}
                  transaction_type={trans.transaction_type}
                  transaction_id={trans.transaction_id}
                />
              );
            })
          ) : (
            <tr>
              <td>No transaction</td>
            </tr>
          )}
        </tbody>
        {/* foot */}
      </table>
    </div>
  );
}
