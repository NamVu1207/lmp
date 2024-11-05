import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Components/Layout/Layout.jsx";
import Login from "./Pages/Login/Login.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import ListOfRentals from "./Pages/ListOfRentals/ListOfRentals.jsx";
import DataEW from "./Pages/DataEW/DataEW.jsx";
import Rentalfee from "./Pages/Rentalfee/Rentalfee.jsx";
import Booking from "./Pages/Booking/Booking.jsx";
import OtherFee from "./Pages/Otherfee/Otherfee.jsx";
import Customer from "./Pages/Management/Customer.jsx";
import Service from "./Pages/Management/Service.jsx";
import Staff from "./Pages/Management/Staff.jsx";
import ListRoom from "./Pages/Management/ListRoom.jsx";
import House from "./Pages/Management/House.jsx";

const router = createBrowserRouter([
  {
    path: "/manager",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "Room", element: <ListOfRentals /> },
      { path: "DataEW", element: <DataEW /> },
      { path: "Rentalfee", element: <Rentalfee /> },
      { path: "Booking", element: <Booking /> },
      { path: "OtherFee", element: <OtherFee /> },
      { path: "Customer", element: <Customer /> },
      { path: "Service", element: <Service /> },
      { path: "Staff", element: <Staff /> },
      { path: "ListRoom", element: <ListRoom /> },
      { path: "House", element: <House /> },
    ],
  },
  { path: "/login", element: <Login /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
