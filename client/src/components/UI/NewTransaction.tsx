export default function NewTransaction() {
  return (
    <fieldset className="fieldset  bg-base-200 border border-base-300 p-4 rounded-box">
      <legend className="fieldset-legend">New Transaction</legend>

      <label className="fieldset-label">Amount</label>
      <input type="number" className="input w-full" placeholder="Amount" />
      <label className="fieldset-label">Date</label>
      <input type="date" className="input w-full" placeholder="Date" />

      <label className="fieldset-label">Card</label>
      <select defaultValue="Pick a color" className="select w-full">
        <option disabled={true}>Category</option>
        <option>Car Name 1</option>
        <option>Card Name 2</option>
        <option>Miscellaneous</option>
      </select>
      <label className="fieldset-label">Category</label>
      <select defaultValue="Pick a color" className="select w-full">
        <option disabled={true}>Category</option>
        <option>Food</option>
        <option>Rent</option>
        <option>Miscellaneous</option>
      </select>

      <button className="btn btn-success mt-4">Add Transaction</button>
    </fieldset>
  );
}
