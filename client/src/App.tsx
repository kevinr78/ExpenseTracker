import "./App.css";
import { AccountProvider } from "./store/AccountContext";
import { TransactionProvider } from "./store/TransactionContext";

import Navbar from "./components/UI/Navbar/Navbar";

import DashBoard from "./components/pages/DashBoard";
function App() {
  return (
    <>
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <AccountProvider>
        <TransactionProvider>
          <DashBoard />
        </TransactionProvider>
      </AccountProvider>
    </>
  );
}

export default App;
