import React from "react";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm  top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>Transaction</a>
            </li>
            <li>
              <a>Accounts</a>
            </li>
            <li>
              <a>Reports</a>
              <ul className="p-2">
                <li>
                  <a>Analytics</a>
                </li>
                <li>
                  <a>Report</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">ExpTrack</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a> Home</a>
          </li>
          <li>
            <a>Transaction</a>
          </li>
          <li>
            <a>Accounts</a>
          </li>
          <li>
            <details>
              <summary>Reports</summary>
              <ul className="p-2">
                <li>
                  <a>Analytics</a>
                </li>
                <li>
                  <a>Reports</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
