import { ModalProps } from "../../../types/types";
import { useAccountContext } from "../../../store/AccountContext";
import AccountItem from "./AccountItem";
import { useEffect } from "react";
import ItemNavbar from "../Navbar/ItemNavbar";

export default function AccountList({ modalAction }: ModalProps) {
  const { accounts, addAccount, fetchAccounts } = useAccountContext();
  useEffect(() => {
    fetchAccounts();
  }, [addAccount]);

  return (
    <ul className="list ">
      <li className="p-4 pb-2 text-xs  tracking-wide sticky top-0  bg-base-100">
        <ItemNavbar type="Accounts" action={modalAction} />
      </li>
      {accounts && accounts.length > 0
        ? accounts?.map((account) => {
            return (
              <AccountItem
                key={account.account_id}
                account_id={account.account_id}
                account_name={account.account_name}
                account_status={account.account_status}
                account_type={account.account_type}
              />
            );
          })
        : "No accounts yet"}
    </ul>
  );
}
