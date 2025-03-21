import { useState } from "react";
import { useTransactionContext } from "../../../store/TransactionContext";
import { Transaction } from "../../../store/TransactionContext";
import { useAccountContext } from "../../../store/AccountContext";
import { expense_category } from "../../../utils/category";
export default function NewTransaction() {
  const { addTransaction } = useTransactionContext();
  const { accounts } = useAccountContext();
  const [accTransfer, setAccTransfer] = useState(false);
  const [formData, setFormData] = useState<Transaction>({
    transaction_to_account: 0,
    transaction_from_account: 0,
    transaction_title: "",
    user_id: 1,
    transaction_amount: 0,
    transaction_type: null,
    transaction_category: "",
    transaction_date: "",
    transaction_description: "",
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "transaction_type") {
      if (e.target.value == "Transfer") setAccTransfer(true);
      else setAccTransfer(false);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload
    const payload = {
      transaction_to_account: formData.transaction_to_account,
      user_id: formData.user_id,
      transaction_title: formData.transaction_title,
      transaction_from_account: formData.transaction_from_account ?? null,
      transaction_amount: formData.transaction_amount,
      transaction_type: formData.transaction_type,
      transaction_category: formData.transaction_category,
      transaction_date: formData.transaction_date,
      transaction_description: formData.transaction_description,
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
        <label className="fieldset-label">Title</label>
        <input
          type="text"
          name="transaction_title"
          className="input w-full  focus:border-0"
          placeholder="Title"
          required
          onChange={handleChange}
        />
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="fieldset-label">Amount</label>
            <input
              type="number"
              name="transaction_amount"
              className="input w-full  focus:border-0"
              placeholder="Amount"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex-1">
            <label className="fieldset-label">Date</label>
            <input
              type="date"
              className="input w-full focus:border-0"
              placeholder="Date"
              required
              name="transaction_date"
              onChange={handleChange}
            />
          </div>
        </div>

        <label className="fieldset-label">Type</label>
        <select
          className="select w-full"
          name="transaction_type"
          onChange={handleChange}
          defaultValue={"Type"}
          required
        >
          <option disabled={true}>Type</option>
          <option value={"Credit"}>Credit</option>
          <option value={"Debit"}>Debit</option>
          <option value={"Transfer"}>Transfer</option>
        </select>
        <label className="fieldset-label">Account</label>
        <select
          className="select w-full"
          name="transaction_to_account"
          onChange={handleChange}
          required
          defaultValue={"Account"}
        >
          <option disabled={true}>Account</option>
          {accounts.map((acc) => {
            if (acc.account_status) {
              return (
                <option key={acc.account_id} value={acc.account_id}>
                  {acc.account_name}
                </option>
              );
            }
          })}
        </select>
        {accTransfer && (
          <div className=" transition-all">
            <label className="fieldset-label"> To Account</label>
            <select
              className="select w-full"
              name="transaction_from_account"
              onChange={handleChange}
              required
              defaultValue={"Account"}
            >
              <option disabled={true}>Account</option>
              {accounts.map((acc) => {
                if (acc.account_status) {
                  return (
                    <option key={acc.account_id} value={acc.account_id}>
                      {acc.account_name}
                    </option>
                  );
                }
              })}
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
        />

        <datalist id="categories">
          {expense_category.map((cat, idx) => {
            return (
              <option key={idx} value={cat}>
                {cat}
              </option>
            );
          })}
        </datalist>

        <label className="fieldset-label">Description</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Description"
          name="transaction_description"
          onChange={handleChange}
        />

        <button className="btn btn-success mt-4" type="submit">
          Add Transaction
        </button>
      </fieldset>
    </form>
  );
}
