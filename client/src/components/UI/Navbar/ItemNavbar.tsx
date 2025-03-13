import { NavBarProps } from "../../../types/types";

export default function ItemNavbar({ type, action }: NavBarProps) {
  return (
    <>
      <div className="navbar p-2 min-h-1">
        <div className="navbar-start">{type}</div>
        <div className="navbar-end gap-2">
          <button className="btn">View All</button>
          <button
            className="btn btn-success"
            onClick={() => {
              const modal = document.getElementById(
                "modal"
              ) as HTMLDialogElement | null;
              action(type);
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
