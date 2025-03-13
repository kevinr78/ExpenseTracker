import React, { useState } from "react";
import AccountList from "../UI/Account/AccountList";
import Stat from "../UI/Stat";
import ItemNavbar from "../UI/Navbar/ItemNavbar";
import Modal from "../UI/Modal";

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
          <Stat />
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
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <ItemNavbar type="Transactions" action={setModalContent} />
          <table className="table ">
            {/* head */}
            <thead className="bg-base-300">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Date</th>
                <th>Category</th>
                <th>Card</th>

                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox checkbox-sm" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
                <th>$100</th>
              </tr>
              {/* row 2 */}
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox checkbox-sm" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">details</button>
                </th>
                <th>$100</th>
              </tr>
            </tbody>
            {/* foot */}
          </table>
        </div>
      </section>
    </main>
  );
}
