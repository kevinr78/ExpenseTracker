import { useOutletContext } from "react-router";
import { OutletContextProps } from "./DashBoard";
import AccountList from "../UI/Account/AccountList";
import FilterBar from "../FilterBar/FilterAccount";

export default function Accounts() {
  const { setModalContent } = useOutletContext<OutletContextProps>();

  return (
    <div className="p-4">
      <FilterBar />
      <AccountList modalAction={setModalContent} />
    </div>
  );
}
