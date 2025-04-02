import { useOutletContext } from "react-router";
import { OutletContextProps } from "./DashBoard";
import Transaction from "../UI/Transaction/Transaction";
import TransactionFilter from "../FilterBar/FilterTransactions";

export default function Transactions() {
  const { setModalContent } = useOutletContext<OutletContextProps>();

  return (
    <div className="p-4">
      <TransactionFilter />
      <Transaction modalAction={setModalContent} />
    </div>
  );
}
