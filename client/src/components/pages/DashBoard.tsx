import React, { useState } from "react";
import AccountList from "../UI/Account/AccountList";

import Modal from "../UI/Modal";
import Transaction from "../UI/Transaction/Transaction";
import Stats from "../UI/Stats/Stats";

export default function DashBoard() {
  const [modalContent, setModalContent] = useState<string>("");

  return (
    <main className="p-4 w-full flex flex-col gap-2 h-screen">
      <Modal content={modalContent} />
      <section id="cta-tab" className="flex justify-around gap-x-2 h-1/2">
        <div
          id="accounts"
          className="flex-1  border bg-base-100 border-base-300 rounded-box shadow-md overflow-y-scroll"
        >
          <AccountList modalAction={setModalContent} />
        </div>
        <div className=" w-full flex-2  flex flex-col gap-2 ">
          <Stats />
          <div className="flex flex-1 gap-x-2 border border-base-300 rounded-lg  overflow-auto ">
            {/* <HomeChart /> */}
          </div>
        </div>
      </section>
      <section id="chart-table">
        <Transaction modalAction={setModalContent} />
      </section>
    </main>
  );
}
