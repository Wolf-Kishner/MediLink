import React from "react";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import MyAccount from "../Dashboard/user-account/MyAccount.jsx";
import Dashboard from "../Dashboard/doctor-account/Dashboard.jsx";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import CheckoutSuccess from "../pages/CheckoutSuccess.jsx";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/doctors" element={<Doctors />}></Route>
      <Route path="/doctors/:id" element={<DoctorDetails />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Signup />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/services" element={<Services />}></Route>
      <Route path="/checkout-success" element={<CheckoutSuccess />}></Route>
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
