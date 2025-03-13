import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types
interface Transaction {
  id: number;
  accountId: number;
  amount: number;
  type: "credit" | "debit";
}

interface TransactionContextProps {
  transactions: Transaction[];
  addTransaction: (newTransaction: Transaction) => void;
  fetchTransactions: () => Promise<void>;
}

// Create Context
const TransactionContext = createContext<TransactionContextProps | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch transactions
  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3000/transactions/all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: 1 }),
      });
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Add transaction
  const addTransaction = async (newTransaction: Transaction) => {
    try {
      await fetch("http://localhost:3000/transactions/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });
      fetchTransactions();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{ transactions, addTransaction, fetchTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// Hook to use the context
export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactionContext must be used within a TransactionProvider"
    );
  }
  return context;
};
