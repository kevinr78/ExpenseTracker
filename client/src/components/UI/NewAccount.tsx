export default function NewAccount() {
  return (
    <fieldset className="fieldset  bg-base-200 border border-base-300 p-4 rounded-box">
      <legend className="fieldset-legend">New Account</legend>

      <label className="fieldset-label">Name</label>
      <input type="text" className="input w-full" placeholder="Account Name" />

      <label className="fieldset-label">Account Type</label>
      <select defaultValue="Pick a color" className="select w-full">
        <option disabled={true}>Pick Account Type</option>
        <option>Visa</option>
        <option>Mastercard</option>
        <option>Other</option>
      </select>
      <label className="fieldset-label">Starting Balance</label>
      <input
        type="number"
        className="input w-full"
        placeholder="Starting Balance"
      />

      <label className="fieldset-label">Status</label>
      <select defaultValue="Status" className="select w-full">
        <option disabled={true}>Status</option>
        <option>Active</option>
        <option>Disabled</option>
      </select>

      <button className="btn btn-success mt-4">Add Account</button>
    </fieldset>
  );
}
