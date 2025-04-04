import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { toast } from "react-toastify";

// Define types
export interface Transaction {
  transaction_id?: number;
  transaction_title: string;
  transaction_to_account: number;
  transaction_from_account?: number | null;
  user_id?: number;
  transaction_amount: number;
  transaction_type: "credit" | "debit" | "Transfer" | null;
  transaction_category: string;
  transaction_date: Date | string;
  transaction_description?: string;
}

interface TransactionContextProps {
  transactions: Transaction[];
  addTransaction: (newTransaction: Transaction) => void;
  fetchTransactions: () => Promise<void>;
  deleteTransaction: (transaction_id: string | number) => Promise<void>;
  updateTransaction: (
    transaction_id: number,
    updatedFields: Partial<Transaction>
  ) => Promise<void>;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

// Create Context
const TransactionContext = createContext<TransactionContextProps | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Fetch transactions
  const fetchTransactions = useCallback(async () => {
    try {
      const request = await fetch(
        `http://localhost:3000/transactions/transaction?user_id=1`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const response = await request.json();
      if (!response.ok) {
        toast(response.error);
        return;
      }
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, []);

  // Add transaction
  const addTransaction = useCallback(
    async (newTransaction: Transaction) => {
      try {
        const request = await fetch(
          "http://localhost:3000/transactions/transaction",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTransaction),
          }
        );
        const response = await request.json();
        if (!response.ok) {
          toast(response.error);
          return;
        }
        setTransactions((prevTrans) => {
          if (prevTrans == null) {
            return response.data[0];
          }
          return [...prevTrans, response.data[0]];
        });

        await fetchTransactions();
      } catch (error) {
        console.error("Error adding transactions:", error);
      } finally {
        let modal = document.getElementById(
          "modal"
        ) as HTMLDialogElement | null;
        if (modal) modal.close();
      }
    },
    [fetchTransactions]
  );

  const deleteTransaction = useCallback(
    async (transaction_id: string | number) => {
      try {
        const request = await fetch(
          `http://localhost:3000/transactions/transaction?user_id=1`,
          {
            method: "DELETE",
            body: JSON.stringify({ transaction_id }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const response = await request.json();
        if (!response.ok) {
          toast(response.error);
          return;
        }
        fetchTransactions();
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    },
    []
  );

  const updateTransaction = useCallback(
    async (
      transaction_id: number,
      updatedTransaction: Partial<Transaction>
    ) => {
      try {
        const request = await fetch(
          `http://localhost:3000/transactions/transaction?user_id=1`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transaction_id,
              fieldsToBeUpdated: updatedTransaction,
            }),
          }
        );
        const response = await request.json();
        if (!response.ok) {
          toast(response.error);
          return;
        }
        fetchTransactions();
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    },
    []
  );

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        fetchTransactions,
        deleteTransaction,
        updateTransaction,
        setTransactions,
      }}
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
