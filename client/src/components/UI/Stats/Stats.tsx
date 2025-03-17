import { useEffect, useState } from "react";
import Stat from "./Stat";
export default function Stats() {
  const [stats, setStats] = useState([
    {
      transaction_type: undefined,
      sum: 0,
    },
  ]);

  const fetchStats = async () => {
    const request = await fetch("http://localhost:3000/stats/stat?user_id=1", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const response = await request.json();

    setStats(response.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);
  return (
    <div className="stats bg-base-100 border border-base-300">
      {stats.map((stat) => {
        return (
          <Stat
            title={`Total ${stat.transaction_type} for this month`}
            value={stat.sum}
          />
        );
      })}
    </div>
  );
}
