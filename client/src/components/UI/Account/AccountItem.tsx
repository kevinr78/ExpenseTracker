import { Accounts } from "./AccountList";

export default function AccountItem({
  account_id,
  account_name,
  account_type,
  account_status,
}: Accounts) {
  return (
    <li key={account_id} className="list-row" data-id={account_id}>
      <div className="text-4xl font-thin opacity-30 tabular-nums">
        {account_id}
      </div>
      <div>
        <img
          className="size-10 rounded-box"
          src="https://img.daisyui.com/images/profile/demo/1@94.webp"
        />
      </div>
      <div className="list-col-grow">
        <div>{account_name}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          {account_type}
        </div>
      </div>
      <div className="flex items-center text-xs gap-2">
        <div
          aria-label="success"
          className={`status ${
            account_status ? "status-success" : "status-info"
          } flex`}
        ></div>
        <span className="opacity-60">
          {account_status ? "Active" : "Disabled"}
        </span>
      </div>
    </li>
  );
}
