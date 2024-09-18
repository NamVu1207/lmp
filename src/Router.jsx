import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Components/Layout/Layout.jsx";
import Login from "./Pages/Login/Login.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
      children: [
        { path: "/", element: <Dashboard /> },
      ],
  },
  { path: "/login", element: <Login /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
