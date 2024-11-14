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
import CustomerService from "./Pages/CustomerService/CustomerService.jsx";
import LayoutManager from "./Components/Layout/LayoutManager.jsx";
import Error from "./Pages/Error/Error.jsx";
import LayoutCustomer from "./Components/Layout/LayoutCustomer.jsx";
import Order from "./Pages/Order/Order.jsx";
import Home from "./Pages/Home/Home.jsx";
import Info from "./Pages/Home/Info.jsx";
import Contact from "./Pages/Home/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "Info", element: <Info /> },
      { path: "Contact", element: <Contact /> },
      {
        path: "customer",
        element: <LayoutCustomer />,
        children: [
          { path: "", element: <CustomerService /> },
          { path: "Order", element: <Order /> },
        ],
      },
      {
        path: "manager",
        element: <LayoutManager />,
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
          { path: "Order", element: <Order /> },
        ],
      },
      { path: "error", element: <Error /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
