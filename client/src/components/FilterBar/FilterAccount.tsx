import { useState } from "react";

import { useAccountContext } from "../../store/AccountContext";
export default function AccountFilter(/* { onFilterChange }: AccountFilterProps */) {
  const { setAccounts, account_type, fetchAccounts } = useAccountContext();
  const [filters, setFilters] = useState({
    account_name: "",
    account_type: "",
    account_status: "",
    minBalance: "",
    maxBalance: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = async () => {
    let base_url = new URL("http://localhost:3000/accounts/account/1");
    const baseFilter = [];
    for (const [key, value] of Object.entries(filters)) {
      if (value !== "" && value !== undefined) {
        baseFilter.push([`${key}`, `${value}`]);
      }
    }
    const params = new URLSearchParams(baseFilter);
    params.append("mode", "filter");
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

    setAccounts(data.data);
  };

  const handleClearFilters = () => {
    setFilters({
      account_name: "",
      account_type: "",
      account_status: "",
      minBalance: "",
      maxBalance: "",
    });
    fetchAccounts();
  };
  return (
    <div className="collapse collapse-arrow bg-base-300 mb-4 sticky">
      <input type="checkbox" />
      <h2 className="text-lg font-bold  collapse-title">Filter Accounts</h2>
      <div className="card bg-base-300 shadow-lg  collapse-content">
        <input
          type="text"
          name="account_name"
          placeholder="Search by Account Name"
          className="input input-bordered w-full mb-2"
          onChange={handleChange}
          value={filters.account_name}
        />
        <div className="flex gap-2">
          <select
            name="account_type"
            className="select select-bordered w-full mb-2"
            onChange={handleChange}
            value={filters.account_type}
          >
            <option disabled={true} value={""} selected={true}>
              Pick Account Type
            </option>
            {account_type.map((acc, idx) => (
              <option key={idx} value={acc.acc_type_id}>
                {acc.acc_type_name}
              </option>
            ))}
          </select>

          <select
            name="account_status"
            className="select select-bordered w-full mb-2"
            onChange={handleChange}
            value={filters.account_status}
          >
            <option value="" disabled={true}>
              All Status
            </option>
            <option value="true">Active</option>
            <option value="false">Disabled</option>
          </select>
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            name="minBalance"
            placeholder="Min Balance"
            className="input input-bordered w-full"
            onChange={handleChange}
            value={filters.minBalance}
          />
          <input
            type="number"
            name="maxBalance"
            placeholder="Max Balance"
            className="input input-bordered w-full"
            onChange={handleChange}
            value={filters.maxBalance}
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
