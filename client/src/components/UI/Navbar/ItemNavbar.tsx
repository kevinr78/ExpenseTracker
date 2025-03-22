import { NavBarProps } from "../../../types/types";

export default function ItemNavbar({ type, action }: NavBarProps) {
  return (
    <>
      <div className="navbar  min-h-1 ">
        <div className="navbar-start text-xl font-bold">{type}</div>
        <div className="navbar-end gap-2">
          <button className="btn">View All</button>
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
