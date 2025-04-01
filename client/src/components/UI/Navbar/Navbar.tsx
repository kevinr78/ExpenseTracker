import { useNavigate } from "react-router";
import { nav_links } from "../../../utils/category";
import { Link } from "react-router";

export default function Navbar() {
  const renderList = nav_links.map((link) =>
    link.children ? (
      <li key={link.id}>
        <details>
          <summary>{link.name}</summary>
          <ul className="p-2">
            {link.children.map((child) => (
              <li key={child.id}>
                <Link to={child.to}>{child.name}</Link>
              </li>
            ))}
          </ul>
        </details>
      </li>
    ) : (
      <li key={link.id}>
        <Link to={link.to}>{link.name}</Link>
      </li>
    )
  );

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
            {renderList}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">ExpTrack</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{renderList}</ul>
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
