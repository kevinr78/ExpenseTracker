import { SetStateAction } from "react";
import { Account } from "../store/AccountContext";
import { Transaction } from "../store/TransactionContext";

export interface ModalProps {
  onClose?: () => void;
  type: "Accounts" | "Transactions";
  item: Account | Transaction | null;
  action: "edit" | "delete" | "new" | "add_balance" | "";
}

export type NavBarProps = {
  type: "Accounts" | "Transactions";
  action: React.Dispatch<SetStateAction<ModalProps>>;
};
