export default function Stat() {
  return (
    <div className="stats bg-base-100 border border-base-300">
      <div className="stat">
        <div className="stat-title">Account balance</div>
        <div className="stat-value">$89,400</div>
        <div className="stat-actions">
          <button className="btn btn-xs btn-success">Add funds</button>
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Current balance</div>
        <div className="stat-value">$89,400</div>
        <div className="stat-actions">
          <button className="btn btn-xs">Withdrawal</button>
          <button className="btn btn-xs">Deposit</button>
        </div>
      </div>
    </div>
  );
}
