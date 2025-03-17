import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from "react";

// Define types

export type Account = {
  account_id?: number;
  account_name: string;
  account_type: string;
  account_starting_balance?: number;
  account_status: boolean;
  account_user_id?: number;
};

interface AccountContextProps {
  accounts: Account[];
  addAccount: (newAccount: Account) => void;
  fetchAccounts: () => Promise<void>;
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
        "http://localhost:3000/accounts/allAccounts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: 1 }),
        }
      );
      const data = await response.json();

      setAccounts(data.data);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  }, []);

  // Add account
  const addAccount = useCallback(
    async (newAccount: Account) => {
      try {
        const request = await fetch(
          "http://localhost:3000/accounts/addAccount",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAccount),
          }
        );
        const response = await request.json();

        console.log("Account Added Successfully");
        setAccounts((prevAcc) => {
          if (prevAcc == null) {
            return response.data;
          }
          return [...prevAcc, response.data];
        });
      } catch (error) {
        console.error("Error adding account:", error);
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
    <AccountContext.Provider value={{ accounts, addAccount, fetchAccounts }}>
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
