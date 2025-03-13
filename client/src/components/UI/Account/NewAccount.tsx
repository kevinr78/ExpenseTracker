import { useState } from "react";
import { Account, useAccountContext } from "../../../store/AccountContext";
type NewAccount = {
  URL: string;
  payload: any;
  method: "GET" | "POST";
};

export default function NewAccount() {
  const { addAccount } = useAccountContext();
  const [formData, setFormData] = useState<Account>({
    account_name: "",
    account_status: false,
    account_type: "",
    account_starting_balance: 0,
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload

    const payload = {
      account_name: formData.account_name,
      account_status: formData.account_status,
      account_type: formData.account_type,
      account_starting_balance: formData.account_starting_balance,
      user_id: 1,
    };
    addAccount(payload);
  };
  return (
    <form action="" id="new-account-form" onSubmit={handleSubmit}>
      <fieldset className="fieldset  bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">New Account</legend>

        <label className="fieldset-label">Name</label>
        <input
          type="text"
          className="input w-full"
          name="account_name"
          placeholder="Account Name"
          onChange={handleChange}
          value={formData.account_name}
        />

        <label className="fieldset-label">Account Type</label>
        <select
          defaultValue="Pick a color"
          className="select w-full"
          name="account_type"
        >
          <option disabled={true}>Pick Account Type</option>
          <option>Visa</option>
          <option>Mastercard</option>
          <option>Other</option>
        </select>
        <label className="fieldset-label">Starting Balance</label>
        <input
          type="number"
          className="input w-full"
          name="account_balance"
          placeholder="Starting Balance"
        />

        <label className="fieldset-label">Status</label>
        <select
          defaultValue="Status"
          className="select w-full"
          name="account_status"
        >
          <option disabled={true}>Status</option>
          <option value={"1"}>Active</option>
          <option value={"0"}>Disabled</option>
        </select>

        <button className="btn btn-success mt-4" type="submit">
          Add Account
        </button>
      </fieldset>
    </form>
  );
}
