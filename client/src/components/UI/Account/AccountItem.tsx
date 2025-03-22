import { Account } from "../../../store/AccountContext";

export default function AccountItem({
  account_id,
  account_name,
  account_type,
  account_status,
}: Account) {
  console.log(account_status);
  return (
    <li
      key={account_id}
      className="list-row hover:bg-base-200 relative group"
      data-id={account_id}
    >
      <div className="text-4xl font-thin opacity-30 tabular-nums">
        {account_id}
      </div>

      <div className="list-col-grow">
        <div>{account_name}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          {account_type}
        </div>
      </div>
      <div className="flex items-center text-xs gap-2 group-hover:-translate-x-24  duration-750">
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

      {/* Button is hidden by default and shown on hover */}
      <div className=" flex gap-2 absolute right-2 bottom-4 opacity-0 group-hover:opacity-100 duration-750 transition-opacity">
        <button
          className="btn btn-sm btn-circle btn-outline btn-info"
          name="edit"
        >
          E
        </button>
        <button
          className="btn btn-sm btn-circle btn-outline btn-error"
          name="delete"
        >
          D
        </button>
      </div>
    </li>
  );
}
