type StatProps = {
  title: string;
  value: string | number;
  text?: string | number;
};

export default function Stat({ title, value }: StatProps) {
  return (
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className="stat-value">${value}</div>
      <div className="stat-actions">
        <button className="btn btn-xs">Withdrawal</button>
        <button className="btn btn-xs">Deposit</button>
      </div>
    </div>
  );
}
