type StatProps = {
  title: string;
  value: string | number;
  text?: string | number;
  type?: string;
};

export default function Stat({ title, value, type }: StatProps) {
  const balance = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));

  let styles = "";
  if (type === "credit") {
    styles = "text-green-600";
  } else if (type === "debit") {
    styles = "text-red-600";
  } else if (type === "total" && Number(value) < 0) {
    styles = "text-red-600";
  } else {
    styles = "text-green-600";
  }
  return (
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className={`stat-value ${styles}`}>{balance}</div>
      <div className="stat-actions">
        <button className="btn btn-xs">Withdrawal</button>
        <button className="btn btn-xs">Deposit</button>
      </div>
    </div>
  );
}
