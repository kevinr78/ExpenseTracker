import { ModalProps } from "../../../types/types";
import { useAccountContext } from "../../../store/AccountContext";
import AccountItem from "./AccountItem";
import { useEffect } from "react";
import ItemNavbar from "../Navbar/ItemNavbar";

type AccountProps = {
  modalAction: React.Dispatch<React.SetStateAction<ModalProps>>;
};
export default function AccountList({ modalAction }: AccountProps) {
  const { accounts, addAccount, fetchAccounts, deleteAccount } =
    useAccountContext();
  useEffect(() => {
    fetchAccounts();
  }, [addAccount]);

  const handleAccountAction = async (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;

    const rowId = target.closest("li")?.dataset.id;
    switch (target.name) {
      case "delete":
        if (!confirm("Are you sure you want to delete this account")) {
          return;
        }
        if (rowId) deleteAccount(rowId);

        return;
      case "edit":
      case "add_balance":
        const account = accounts.find((acc) => acc.account_id == rowId);
        if (account) {
          modalAction({ type: "Accounts", item: account, action: target.name });
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
    <ul className="list" onClick={handleAccountAction}>
      <li className="p-4 pb-2 text-xs z-[4] tracking-wide sticky top-0  bg-base-200">
        <ItemNavbar type="Accounts" action={modalAction} />
      </li>
      {accounts && accounts.length > 0 ? (
        accounts?.map((account) => {
          return (
            <AccountItem
              key={account.account_id}
              account_id={account.account_id}
              account_name={account.account_name}
              account_status={account.account_status}
              account_type={account.account_type}
              account_balance={account.account_balance}
            />
          );
        })
      ) : (
        <li className="list-row">No accounts yet</li>
      )}
    </ul>
  );
}
