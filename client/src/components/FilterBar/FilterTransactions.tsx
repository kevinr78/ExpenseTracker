import { useState } from "react";

import { useTransactionContext } from "../../store/TransactionContext";
export default function TransactionFilter(/* { onFilterChange }: AccountFilterProps */) {
  const { fetchTransactions, setTransactions } = useTransactionContext();
  const [filters, setFilters] = useState({
    transaction_title: "",
    transaction_type: "",
    transaction_category: "",
    start_date: "",
    end_date: "",
    min_amount: "",
    max_amount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = async () => {
    console.log(filters);
    let base_url = new URL("http://localhost:3000/transactions/transaction");
    const baseFilter = [];
    for (const [key, value] of Object.entries(filters)) {
      if (value !== "" && value !== undefined) {
        baseFilter.push([`${key}`, `${value}`]);
      }
    }
    const params = new URLSearchParams(baseFilter);
    params.append("user_id", "1");
    params.append("mode", "filter");
    console.log(`${base_url.toString()}?${params.toString()}`);
    const request = await fetch(`${base_url.toString()}?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();
    if (!data.ok) {
      console.log(data.message);
      return;
    }

    setTransactions(data.data);
  };

  const handleClearFilters = () => {
    setFilters({
      transaction_title: "",
      transaction_type: "",
      transaction_category: "",
      start_date: "",
      end_date: "",
      min_amount: "",
      max_amount: "",
    });
    fetchTransactions();
  };
  return (
    <div className="collapse collapse-arrow bg-base-300 mb-4">
      <input type="checkbox" />
      <h2 className="text-lg font-bold  collapse-title">Filter Transactions</h2>
      <div className="card bg-base-300 shadow-lg  collapse-content">
        <input
          type="text"
          name="transaction_title"
          placeholder="Search by transaction title"
          className="input input-bordered w-full mb-2"
          onChange={handleChange}
          value={filters.transaction_title}
        />
        <div className="flex gap-2">
          <select
            name="transaction_type"
            className="select select-bordered w-full mb-2"
            onChange={handleChange}
            value={filters.transaction_type}
          >
            <option disabled={true} value={""} selected={true}>
              Pick Account Type
            </option>
            <option value="Credit">Credit</option>
            <option value="Debit">Debit</option>
            <option value="Transfer">Transfer</option>
            {/*  {account_type.map((acc, idx) => (
              <option key={idx} value={acc.acc_type_id}>
                {acc.acc_type_name}
              </option>
            ))} */}
          </select>

          <input
            type="text"
            name="transaction_category"
            placeholder="Search by transaction category"
            className="select select-bordered w-full mb-2"
            onChange={handleChange}
            value={filters.transaction_category}
          />
        </div>
        <div className="flex gap-2 mb-2">
          <label className="input w-full">
            From
            <input
              type="date"
              name="start_date"
              placeholder="Start Date"
              className="input input-bordered w-full  focus:outline-0"
              onChange={handleChange}
              value={filters.start_date}
            />
          </label>
          <label className="input w-full">
            To
            <input
              type="date"
              name="end_date"
              placeholder="End Date"
              className="input input-bordered w-full focus:outline-0"
              onChange={handleChange}
              value={filters.end_date}
            />
          </label>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            name="min_amount"
            placeholder="Min. Amount"
            className="input input-bordered w-full"
            onChange={handleChange}
            value={filters.min_amount}
          />
          <input
            type="number"
            name="max_amount"
            placeholder="Max Amount"
            className="input input-bordered w-full"
            onChange={handleChange}
            value={filters.max_amount}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button className="btn btn-success mt-3" onClick={handleApplyFilters}>
            Apply Filters
          </button>
          <button className="btn btn-error mt-3" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}
