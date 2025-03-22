import { useEffect, useState } from "react";
import Stat from "./Stat";
import { useTransactionContext } from "../../../store/TransactionContext";
import { toast } from "react-toastify";
export default function Stats() {
  const { transactions, addTransaction } = useTransactionContext();
  const [stats, setStats] = useState([
    {
      amount: "",
      expense_type: "",
    },
  ]);

  const fetchStats = async () => {
    const request = await fetch("http://localhost:3000/stats/stat?user_id=1", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const response = await request.json();

    if (!response.ok) {
      toast(response.error);
      return;
    }
    setStats(response.data);
  };

  useEffect(() => {
    fetchStats();
  }, [transactions, addTransaction]);
  return (
    <div className="stats bg-base-100 border border-base-300">
      <Stat
        title={`Total ${stats[0]?.expense_type || "Credit"} for this month`}
        value={stats[0]?.amount || 0}
        type="credit"
      />
      <Stat
        title={`Total ${stats[1]?.expense_type || "Debit"} for this month`}
        value={stats[1]?.amount || 0}
        type="debit"
      />
      <Stat
        title={`Total Balance for this month`}
        value={Number(stats[0].amount) - Number(stats[1]?.amount) || 0}
        type="total"
      />
    </div>
  );
}
