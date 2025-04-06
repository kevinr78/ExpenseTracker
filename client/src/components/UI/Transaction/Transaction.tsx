import ItemNavbar from "../Navbar/ItemNavbar";
import { ModalProps } from "../../../types/types";
import { useTransactionContext } from "../../../store/TransactionContext";
import TransactionRow from "./TransactionRow";
import { useEffect } from "react";
import { useLocation } from "react-router";

type TransactionProps = {
  modalAction: React.Dispatch<React.SetStateAction<ModalProps>>;
};

export default function Transaction({ modalAction }: TransactionProps) {
  const locate = useLocation();

  const { transactions, fetchTransactions, addTransaction, deleteTransaction } =
    useTransactionContext();
  useEffect(() => {
    fetchTransactions();
  }, [addTransaction]);

  const handleTransactionAction = async (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    const rowId = target.closest("tr")?.dataset.id;
    switch (target.name) {
      case "delete":
        if (!confirm("Are you sure you want to delete this transaction")) {
          return;
        }
        if (rowId) deleteTransaction(rowId);

        return;
      case "edit":
        const transaction = transactions.find(
          (trn) => trn.transaction_id == rowId
        );
        if (transaction) {
          modalAction({
            type: "Transactions",
            item: transaction,
            action: "edit",
          });
          const modal = document.getElementById(
            "modal"
          ) as HTMLDialogElement | null;
          if (modal) modal.showModal();
        }
        return;
      default:
        return;
    }
  };

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <div className="p-4 pb-2 text-xs  tracking-wide sticky top-0 z-10 bg-base-100">
        <ItemNavbar type="Transactions" action={modalAction} />
      </div>
      <table className="table" onClick={handleTransactionAction}>
        {/* head */}
        <thead className="bg-base-300">
          <tr>
            <th></th>
            <th>Name</th>
            <th>Date</th>
            <th>Category</th>
            <th> From Account Num.</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((trans) => {
              return (
                <TransactionRow
                  key={trans.transaction_id}
                  transaction_title={trans.transaction_title}
                  transaction_to_account={trans.transaction_to_account}
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
        {locate.pathname === "/transactions" && (
          <tfoot className="hover:bg-primary group">
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>Show More</th>
            <th></th>
            <th></th>
            <th></th>
          </tfoot>
        )}
        {/* foot */}
      </table>
    </div>
  );
}
