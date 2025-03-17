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
        <div className=" w-full flex-2  flex flex-col gap-2">
          <Stats />
          <div className="flex gap-x-2 border border-base-300 rounded-lg  ">
            <div className="card card-side bg-base-100 shadow-sm w-full ">
              <div className="card-body">
                <h2 className="card-title">Summary</h2>
                <p>Some Chart</p>
              </div>
              <div className="p-2">
                <div
                  className="radial-progress p-2"
                  style={
                    {
                      "--value": "70",
                      "--size": "10rem",
                      "--thickness": "1rem",
                    } as React.CSSProperties
                  }
                  aria-valuenow={70}
                  role="progressbar"
                >
                  70%
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="chart-table">
        <Transaction modalAction={setModalContent} />
      </section>
    </main>
  );
}
