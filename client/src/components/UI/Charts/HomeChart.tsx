import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useTransactionContext } from "../../../store/TransactionContext";
export default function HomeChart() {
  const { transactions } = useTransactionContext();
  const expenseByCategory: Record<string, number> = {};

  transactions.reduce((acc, expense) => {
    if (!acc[expense.transaction_category]) {
      acc[expense.transaction_category] = 0;
    }
    acc[expense.transaction_category] += expense.transaction_amount;
    return acc;
  }, expenseByCategory);
  const formattedData = Object.entries(expenseByCategory).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );
  console.log(formattedData);
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="category" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
