import NewAccount from "./NewAccount";
import NewTransaction from "./NewTransaction";

interface ModalProps {
  onClose?: () => void;
  content: string;
}

export default function Modal({ content }: ModalProps) {
  return (
    <>
      <dialog id="modal" className="modal">
        <div className="modal-box">
          {content === "newAccount" ? <NewAccount /> : <NewTransaction />}
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
