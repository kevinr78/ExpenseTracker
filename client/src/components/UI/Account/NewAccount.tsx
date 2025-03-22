import { useState, useEffect } from "react";
import { Account, useAccountContext } from "../../../store/AccountContext";
import { account_types } from "../../../utils/category";

type NewAccount = {
  data?: Account | null;
};

export default function NewAccount({ data }: NewAccount) {
  const { addAccount, updateAccount } = useAccountContext();
  const defaultFormState: Account = {
    account_name: "",
    account_status: "false",
    account_type: "",
    account_starting_balance: 0,
    account_user_id: 1,
  };
  const [formData, setFormData] = useState<Account>(defaultFormState);
  const [updatedFields, setUpdatedFields] = useState<Partial<Account>>({});

  // Handle input changes
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Track only modified fields for updates
    if (data) {
      setUpdatedFields((prev) => ({
        ...prev,
        ...(data[name as keyof Account] !== value ? { [name]: value } : {}),
      }));
    }
  };

  // Effect to populate form when editing
  useEffect(() => {
    if (data) {
      setFormData({
        ...defaultFormState, // Ensure no missing fields
        ...data, // Override only existing fields
      });
      setUpdatedFields({}); // Reset modified fields when switching transactions
    } else {
      setFormData(defaultFormState);

      setUpdatedFields({});
    }
  }, [data]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload

    if (data) {
      // Editing mode: Send only modified fields
      if (Object.keys(updatedFields).length === 0) {
        console.log("No changes detected!");
        return; // Prevent unnecessary API call
      }
      if (data.account_id) {
        await updateAccount(data.account_id, updatedFields);
      }
    } else {
      // Adding a new transaction: Send full form data

      addAccount(formData);
    }

    // Reset form after submission
    setFormData(defaultFormState);

    setUpdatedFields({});
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
          onChange={handleChange}
          name="account_type"
          value={formData.account_type}
        >
          <option disabled={true}>Pick Account Type</option>
          {account_types.map((acc, idx) => (
            <option key={idx} value={acc}>
              {acc}
            </option>
          ))}
        </select>
        <label className="fieldset-label">Starting Balance</label>
        <input
          type="number"
          className="input w-full"
          onChange={handleChange}
          name="account_starting_balance"
          placeholder="Starting Balance"
          value={formData.account_starting_balance}
        />

        <label className="fieldset-label">Status</label>
        <select
          className="select w-full"
          onChange={handleChange}
          name="account_status"
          value={formData.account_status as string}
        >
          <option disabled={true}>Status</option>
          <option value={"true"}>Active</option>
          <option value={"false"}>Disabled</option>
        </select>

        <button className="btn btn-success mt-4" type="submit">
          {data ? "Update Account" : "Add Account"}
        </button>
      </fieldset>
    </form>
  );
}
