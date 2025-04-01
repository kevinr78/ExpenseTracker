import Navbar from "./UI/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";
import { AccountProvider } from "../store/AccountContext";
import { TransactionProvider } from "../store/TransactionContext";
import { Slide } from "react-toastify";
import { ModalProps } from "../types/types";
import { useState } from "react";
import Modal from "./UI/Modal";

export default function Layout() {
  const [modalContent, setModalContent] = useState<ModalProps>({
    type: "Accounts",
    item: null,
    action: "",
  });
  return (
    <>
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <AccountProvider>
        <TransactionProvider>
          <Modal
            type={modalContent.type}
            item={modalContent.item}
            action={modalContent.action}
          />
          <Outlet context={{ modalContent, setModalContent }} />
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
