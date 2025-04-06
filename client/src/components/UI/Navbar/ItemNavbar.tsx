import { NavBarProps } from "../../../types/types";
import handleDownload from "../../../utils/handleDownload";
export default function ItemNavbar({ type, action }: NavBarProps) {
  const URI = new URL(window.location.href).pathname;

  return (
    <>
      <div className="navbar  min-h-1 ">
        <div className="navbar-start text-xl font-bold">{type}</div>
        <div className="navbar-end gap-2">
          {URI === "/" && <button className="btn">View All</button>}
          {URI !== "/" && (
            <button
              className="btn btn-info"
              onClick={() => {
                handleDownload(type);
              }}
            >
              Download {type} data as PDF
            </button>
          )}
          <button
            className="btn btn-success"
            onClick={() => {
              const modal = document.getElementById(
                "modal"
              ) as HTMLDialogElement | null;
              action({ type, item: null });
              if (modal) modal.showModal();
            }}
          >
            Add New
          </button>
        </div>
      </div>
    </>
  );
}
