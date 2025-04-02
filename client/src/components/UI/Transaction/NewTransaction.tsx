import { useState, useEffect } from "react";
import { useTransactionContext } from "../../../store/TransactionContext";
import { Transaction } from "../../../store/TransactionContext";
import { useAccountContext } from "../../../store/AccountContext";
import { expense_category } from "../../../utils/category";

type NewTransactionProps = {
  data?: Transaction | null;
};

export default function NewTransaction({ data }: NewTransactionProps) {
  const { addTransaction, updateTransaction } = useTransactionContext();
  const { accounts } = useAccountContext();

  // Default form state for new transactions
  const defaultFormState: Transaction = {
    transaction_to_account: 0,
    transaction_from_account: null,
    transaction_title: "",
    user_id: 1,
    transaction_amount: 0,
    transaction_type: null,
    transaction_category: "",
    transaction_date: "",
    transaction_description: "",
  };

  // State for form data
  const [formData, setFormData] = useState<Transaction>(defaultFormState);
  const [updatedFields, setUpdatedFields] = useState<Partial<Transaction>>({});
  const [accTransfer, setAccTransfer] = useState(false);

  // Effect to populate form when editing
  useEffect(() => {
    if (data) {
      setFormData({
        ...defaultFormState, // Ensure no missing fields
        ...data, // Override only existing fields
        transaction_date: data.transaction_date
          ? new Date(data.transaction_date).toISOString().split("T")[0] // Ensure date format
          : defaultFormState.transaction_date,
      });
      setAccTransfer(data.transaction_type === "Transfer");
      setUpdatedFields({}); // Reset modified fields when switching transactions
    } else {
      setFormData(defaultFormState);
      setAccTransfer(false);
      setUpdatedFields({});
    }
  }, [data]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "transaction_type") {
      setAccTransfer(value === "Transfer");
    }

    // Track only modified fields for updates
    if (data) {
      setUpdatedFields((prev) => ({
        ...prev,
        ...(data[name as keyof Transaction] !== value ? { [name]: value } : {}),
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (data) {
      // Editing mode: Send only modified fields
      if (Object.keys(updatedFields).length === 0) {
        console.log("No changes detected!");
        return; // Prevent unnecessary API call
      }
      if (data.transaction_id) {
        await updateTransaction(data.transaction_id, updatedFields);
      }
    } else {
      // Adding a new transaction: Send full form data
      addTransaction(formData);
    }

    // Reset form after submission
    setFormData(defaultFormState);
    setAccTransfer(false);
    setUpdatedFields({});
  };

  return (
    <form id="new-transaction-form" onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">
          {data ? "Edit Transaction" : "New Transaction"}
        </legend>

        <label className="fieldset-label">Title</label>
        <input
          type="text"
          name="transaction_title"
          className="input w-full"
          placeholder="Title"
          required
          onChange={handleChange}
          value={formData.transaction_title}
        />

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="fieldset-label">Amount</label>
            <input
              type="number"
              name="transaction_amount"
              className="input w-full"
              placeholder="Amount"
              required
              onChange={handleChange}
              value={formData.transaction_amount}
            />
          </div>
          <div className="flex-1">
            <label className="fieldset-label">Date</label>
            <input
              type="date"
              className="input w-full"
              name="transaction_date"
              required
              onChange={handleChange}
              value={
                formData.transaction_date instanceof Date
                  ? formData.transaction_date.toISOString().split("T")[0]
                  : formData.transaction_date
              }
            />
          </div>
        </div>

        <label className="fieldset-label">Type</label>
        <select
          className="select w-full"
          name="transaction_type"
          onChange={handleChange}
          required
          value={formData.transaction_type || ""}
        >
          <option disabled value="">
            Type
          </option>
          <option value="Credit">Credit</option>
          <option value="Debit">Debit</option>
          <option value="Transfer">Transfer</option>
        </select>

        <label className="fieldset-label">Account</label>
        <select
          className="select w-full"
          name="transaction_to_account"
          onChange={handleChange}
          required
          value={formData.transaction_to_account || ""}
        >
          <option disabled value="">
            {accounts.every((acc) => acc.account_status === "false")
              ? "No Active Accounts"
              : "Account"}
          </option>
          {accounts.map((acc) =>
            acc.account_status === "true" ? (
              <option key={acc.account_id} value={acc.account_id}>
                {acc.account_name}
              </option>
            ) : null
          )}
        </select>

        {accTransfer && (
          <div className="transition-all">
            <label className="fieldset-label">From Account</label>
            <select
              className="select w-full"
              name="transaction_from_account"
              onChange={handleChange}
              required
              value={formData.transaction_from_account || ""}
            >
              <option disabled value="">
                Account
              </option>
              {accounts.map((acc) =>
                acc.account_status ? (
                  <option key={acc.account_id} value={acc.account_id}>
                    {acc.account_name}
                  </option>
                ) : null
              )}
            </select>
          </div>
        )}

        <label className="fieldset-label">Category</label>
        <input
          list="categories"
          name="transaction_category"
          className="input w-full"
          onChange={handleChange}
          placeholder="Select or type a category"
          required
          value={formData.transaction_category}
        />

        <datalist id="categories">
          {expense_category.map((cat, idx) => (
            <option key={idx} value={cat} />
          ))}
        </datalist>

        <label className="fieldset-label">Description</label>
        <input
          type="text"
          name="transaction_description"
          className="input w-full"
          placeholder="Description"
          onChange={handleChange}
          value={formData.transaction_description}
        />

        <button className="btn btn-success mt-4" type="submit">
          {data ? "Update Transaction" : "Add Transaction"}
        </button>
      </fieldset>
    </form>
  );
}
