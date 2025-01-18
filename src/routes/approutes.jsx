import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homelayout from "../layouts/homelayout";
import DashLayout from "../layouts/dashLayout";
import Notfound from "../components/not-found";
import { ToastContainer } from "react-toastify";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";
import Account from "../pages/account";
import Transaction from "../pages/transaction";
import Budget from "../pages/budget";
import Notification from "../pages/notification";
import Profile from "../pages/profile";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Home Routes */}
        <Route path="/" element={<Homelayout />}>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/dashboard/accounts" element={<Account />} />
          <Route path="/dashboard/transactions" element={<Transaction />} />
          <Route path="/dashboard/budget" element={<Budget />} />
          <Route path="/dashboard/notifications" element={<Notification />} />
          <Route path="/dashboard/profile" element={<Profile />} />
        </Route>

        {/* Catch-All Route */}
        <Route path="*" element={<Notfound />} />
      </Routes>

      {/* Toast Container */}
      <ToastContainer position="top-right" />
    </Router>
  );
};

export default AppRoutes;
