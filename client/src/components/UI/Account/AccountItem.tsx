import { Account } from "../../../store/AccountContext";
import { useLocation } from "react-router";
export default function AccountItem({
  account_id,
  account_name,
  account_type,
  account_status,
  account_balance,
}: Account) {
  const location = useLocation();

  return (
    <li
      key={account_id}
      className="list-row hover:bg-base-200 relative group flex items-center justify-between"
      data-id={account_id}
    >
      <div className="flex gap-2">
        <div className="text-4xl font-thin opacity-30 tabular-nums">
          {account_id}
        </div>

        <div className="list-col-grow">
          <div>{account_name}</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            {account_type}
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col  items-end  gap-2 group-hover:-translate-x-32  duration-750">
          <div className="flex items-center gap-2">
            <div
              aria-label="success"
              className={`status ${
                account_status ? "status-success" : "status-info"
              } flex`}
            ></div>
            <span className="opacity-60 ">
              {account_status == "true" ? "Active" : "Disabled"}
            </span>
          </div>

          {location.pathname === "/accounts" && (
            <div className=" opacity-60 text-md">
              <p>
                Current Balance:{" "}
                <span className="font-bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(account_balance))}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Button is hidden by default and shown on hover */}
        {location.pathname === "/accounts" && (
          <div className=" flex gap-2 absolute right-2 bottom-4 opacity-0 group-hover:opacity-100 duration-750 transition-opacity">
            <div className="tooltip" data-tip="Edit Acc.">
              <button
                className="btn btn-sm btn-circle btn-outline btn-info"
                name="edit"
              >
                E
              </button>
            </div>
            <div className="tooltip" data-tip="Delete Acc.">
              <button
                className="btn btn-sm btn-circle btn-outline btn-error"
                name="delete"
              >
                D
              </button>
            </div>
            <div className="tooltip" data-tip="Add Balance">
              <button
                className="btn btn-sm btn-circle btn-outline btn-warning"
                name="add_balance"
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </li>
  );
}
