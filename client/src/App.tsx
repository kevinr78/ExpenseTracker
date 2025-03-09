import { useState } from "react";
import "./App.css";
import AccountList from "./components/UI/AccountList";
import Modal from "./components/UI/Modal";
import Navbar from "./components/UI/Navbar";
import Stat from "./components/UI/Stat";
function App() {
  const [modalContent, setModalContent] = useState("");

  return (
    <>
      <Modal content={modalContent} />
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <main className="p-4 w-full flex flex-col gap-2">
        <section id="cta-tab" className="flex justify-around gap-x-2 h-full">
          <div
            id="accounts"
            className="flex-1  border  bg-base-100 border-base-300 rounded-box shadow-md"
          >
            <AccountList handleModalContent={setModalContent} />
          </div>
          <div className=" w-full flex-2  flex flex-col gap-2">
            <Stat handleModalContent={setModalContent} />
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
            <div className="navbar min-h-1">
              <div className="navbar-start text-lg">Transaction</div>
              <div className="navbar-end">
                <button className="btn"> View All</button>
              </div>
            </div>
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
    </>
  );
}

export default App;
