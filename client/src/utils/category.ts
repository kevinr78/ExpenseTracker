export const expense_category = [
  "Rent",
  "Misc.",
  "Grocery",
  "Subscriptions",
  "Utilites",
  "Transport",
  "Insurance",
];

export const account_types = [
  { name: "Bank Account (Checking)", id: 1 },
  { name: "Bank Account (Savings)", id: 2 },
  { name: "Cash", id: 3 },
  { name: "Credit Card", id: 4 },
];

export const nav_links = [
  {
    name: "Dashboard",
    id: 1,
    to: "/",
  },

  {
    name: "Transactions",
    to: "/transactions",
    id: 2,
  },
  {
    name: "Accounts",
    to: "/accounts",
    id: 3,
  },
  {
    name: "Reports",
    to: "/reports",
    id: 4,
    children: [
      {
        name: "Analytics",
        to: "/reports/analytics",
        id: 5,
      },
      {
        name: "Report",
        to: "/reports/report",
        id: 6,
      },
    ],
  },
];
