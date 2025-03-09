import { ModalProps } from "../../utils/types/types";
export default function Stat({ handleModalContent }: ModalProps) {
  return (
    <div className="stats bg-base-100 border border-base-300">
      <div className="stat">
        <div className="stat-title">Account balance</div>
        <div className="stat-value">$89,400</div>
        <div className="stat-actions">
          <button className="btn btn-xs btn-success">Add funds</button>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Current balance</div>
        <div className="stat-value">$89,400</div>
        <div className="stat-actions">
          <button className="btn btn-xs">Withdrawal</button>
          <button className="btn btn-xs">Deposit</button>
        </div>
      </div>
      <div className="stat">
        <div className="stat-title">Add Transaction</div>
        <div className="stat-actions">
          <button
            className="btn btn-md btn-success"
            onClick={() => {
              handleModalContent("newTransaction");
              const modal = document.getElementById(
                "modal"
              ) as HTMLDialogElement | null;
              if (modal) modal.showModal();
            }}
          >
            Add New
          </button>
        </div>
      </div>
    </div>
  );
}
