import { useState } from "react";
import { useTransactionContext } from "../../../store/TransactionContext";
import { Transaction } from "../../../store/TransactionContext";

export default function NewTransaction() {
  const { addTransaction } = useTransactionContext();
  const [formData, setFormData] = useState<Transaction>({
    transaction_account: 0,
    user_id: 1,
    transaction_amount: 0,
    transaction_type: null,
    transaction_category: "",
    transaction_date: "",
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
      transaction_account: formData.transaction_account,
      user_id: formData.user_id,
      transaction_amount: formData.transaction_amount,
      transaction_type: formData.transaction_type,
      transaction_category: formData.transaction_category,
      transaction_date: formData.transaction_date,
    };

    addTransaction(payload);
    const form = document.getElementById(
      "new-transaction-form"
    ) as HTMLFormElement;
    form.reset();
  };
  return (
    <form action="" id="new-transaction-form" onSubmit={handleSubmit}>
      <fieldset className="fieldset  bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">New Transaction</legend>

        <label className="fieldset-label">Amount</label>
        <input
          type="number"
          name="transaction_amount"
          className="input w-full"
          placeholder="Amount"
          onChange={handleChange}
        />
        <label className="fieldset-label">Date</label>
        <input
          type="date"
          className="input w-full"
          placeholder="Date"
          name="transaction_date"
          onChange={handleChange}
        />

        <label className="fieldset-label">Account</label>
        <select
          defaultValue="Pick a color"
          className="select w-full"
          name="transaction_account"
          onChange={handleChange}
        >
          <option disabled={true}>Account</option>
          <option value={20}>Acc 1</option>
          <option value={20}>Acc 2</option>
        </select>
        <label className="fieldset-label">Type</label>
        <select
          defaultValue="Pick a color"
          className="select w-full"
          name="transaction_type"
          onChange={handleChange}
        >
          <option disabled={true}>Type</option>
          <option>Credit</option>
          <option>Debit</option>
        </select>

        <label className="fieldset-label">Category</label>
        <select
          defaultValue="Pick a Category"
          name="transaction_category"
          className="select w-full"
          onChange={handleChange}
        >
          <option disabled={true}>Category</option>
          <option>Food</option>
          <option>Rent</option>
          <option>Miscellaneous</option>
        </select>

        <button className="btn btn-success mt-4" type="submit">
          Add Transaction
        </button>
      </fieldset>
    </form>
  );
}
