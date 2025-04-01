import "./App.css";
import { createBrowserRouter } from "react-router";
import Transactions from "./components/pages/Transactions";

import Accounts from "./components/pages/Accounts";
import { RouterProvider } from "react-router/dom";
import Layout from "./components/Layout";
import DashBoard from "./components/pages/DashBoard";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        path: "/",
        Component: DashBoard,
      },
      {
        path: "/transactions",
        Component: Transactions,
      },
      {
        path: "/accounts",
        Component: Accounts,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={BrowserRouter} />;
}

export default App;
