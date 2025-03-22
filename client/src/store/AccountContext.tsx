import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";
import { toast } from "react-toastify";
// Define types

export type Account = {
  account_id?: number;
  account_name: string;
  account_type: string;
  account_starting_balance?: number;
  account_status: boolean | string;
  account_user_id?: number;
};

interface AccountContextProps {
  accounts: Account[];
  addAccount: (newAccount: Account) => void;
  fetchAccounts: () => Promise<void>;
  deleteAccount: (account_id: string) => Promise<void>;
  updateAccount: (account_id: number, updatedFields: {}) => Promise<void>;
}

// Create Context
const AccountContext = createContext<AccountContextProps | undefined>(
  undefined
);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  // Fetch accounts
  const fetchAccounts = useCallback(async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/accounts/account?user_id=1",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (!data.ok) {
        toast(data.error);
        return;
      }
      if (data.data.length === 0) {
        setAccounts([]);
        return;
      }

      setAccounts(data.data);
    } catch (error: any) {
      console.error("Error fetching accounts:", error);
      toast(error.message);
    }
  }, []);
  // Fetch accounts
  const updateAccount = useCallback(
    async (account_id: number, fieldsToBeUpdated: {}) => {
      try {
        const response = await fetch("http://localhost:3000/accounts/account", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: 1, account_id, fieldsToBeUpdated }),
        });
        const data = await response.json();
        if (!data.ok) {
          toast(data.error);
          return;
        }
        fetchAccounts();
      } catch (error: any) {
        console.error("Error fetching accounts:", error);
        toast(error.message);
      }
    },
    []
  );
  const deleteAccount = useCallback(async (account_id: string) => {
    try {
      const response = await fetch("http://localhost:3000/accounts/account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: 1, account_id }),
      });
      const data = await response.json();
      if (!data.ok) {
        toast(data.error);
        return;
      }
      fetchAccounts();
    } catch (error: any) {
      console.error("Error fetching accounts:", error);
      toast(error.message);
    }
  }, []);

  // Add account
  const addAccount = useCallback(
    async (newAccount: Account) => {
      try {
        const request = await fetch("http://localhost:3000/accounts/account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAccount),
        });
        const response = await request.json();

        if (!response.ok) {
          toast(response.error);
          return;
        }

        setAccounts((prevAcc) => {
          if (prevAcc == null) {
            return response.data;
          }
          return [...prevAcc, response.data[0]];
        });
      } catch (error: any) {
        console.error("Error adding account:", error);
        toast(error.message);
      } finally {
        let modal = document.getElementById(
          "modal"
        ) as HTMLDialogElement | null;
        if (modal) modal.close();
      }
    },
    [fetchAccounts]
  );

  return (
    <AccountContext.Provider
      value={{
        accounts,
        addAccount,
        fetchAccounts,
        deleteAccount,
        updateAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

// Hook to use the context
export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountContext must be used within an AccountProvider");
  }
  return context;
};
