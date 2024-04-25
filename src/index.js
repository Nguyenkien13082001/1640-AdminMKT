import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./Page/admin";
import AdminEvent from "./Page/adminEvent";
import ManageAccount from "./Page/manageAccount";
import AdminFaculty from "./Page/adminFaculty";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./Page/login";
import AdminChart from "./Page/adminChart";
import MarketingManage from "./Page/marketingManage";
import Coordinator from "./Page/Coordinator";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="marketing/home" element={<Admin />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="admin/event" element={<AdminEvent />} />
          <Route path="/admin" element={<ManageAccount />} />
          <Route path="admin/faculty" element={<AdminFaculty />} />
          <Route path="marketing/dashboard" element={<AdminChart />} />
          <Route path="marketing" element={<MarketingManage />} />
          <Route path="coordinator/home" element={<Coordinator />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
    <ToastContainer
      position="top-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
);
