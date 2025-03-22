import NewAccount from "./Account/NewAccount";
import NewTransaction from "./Transaction/NewTransaction";

import { Account } from "../../store/AccountContext";
import { Transaction } from "../../store/TransactionContext";
interface ModalProps {
  onClose?: () => void;
  content: string;
  data: Account | Transaction | null;
}

export default function Modal({ content, data }: ModalProps) {
  return (
    <>
      <dialog id="modal" className="modal">
        <div className="modal-box">
          {content === "Accounts" ? (
            <NewAccount data={data as Account} />
          ) : (
            <NewTransaction data={data as Transaction} />
          )}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
