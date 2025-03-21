import "./App.css";
import { AccountProvider } from "./store/AccountContext";
import { TransactionProvider } from "./store/TransactionContext";
import { ToastContainer, Slide } from "react-toastify";
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
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
      />
    </>
  );
}

export default App;
