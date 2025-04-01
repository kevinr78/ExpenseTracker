import NewAccount from "./Account/NewAccount";
import NewTransaction from "./Transaction/NewTransaction";

import { Account } from "../../store/AccountContext";
import { Transaction } from "../../store/TransactionContext";
import { ModalProps } from "../../types/types";

export default function Modal({ type, item, action }: ModalProps) {
  return (
    <>
      <dialog id="modal" className="modal">
        <div className="modal-box">
          {type === "Accounts" ? (
            <NewAccount data={item as Account} action={action} />
          ) : (
            <NewTransaction data={item as Transaction} />
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
