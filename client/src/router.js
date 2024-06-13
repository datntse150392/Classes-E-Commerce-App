import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import LoginForm from "./components/Client/LoginForm";
import Homepage from "./pages/Client/HomePage";
import SignUpForm from "./components/Client/SignUpForm";
import ProductDetail from "./components/Client/ProductDetail";
import CheckoutStep from "./components/Client/CheckoutStep";
import CartStep from "./components/Client/CartStep";
import SelectLenses from "./components/Client/SelectLenses";
import AdminLayout from "./layouts/AdminLayout";
import PaymentStep from "./components/PaymentStep";
import Dashboard from "./pages/Admin/Dashboard";
import Orders from "./pages/Admin/OrdersPage";
import Eyeglasses from "./pages/Admin/EyeglassesPage";
import Lenses from "./pages/Admin/LensesPage";
import Users from "./pages/Admin/UsersPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
              <ClientLayout>
                <Homepage />
              </ClientLayout>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/product/:id"
          element={
            <ClientLayout>
              <ProductDetail />
            </ClientLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <ClientLayout>
              <CartStep />
            </ClientLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <ClientLayout>
              <CheckoutStep />
            </ClientLayout>
          }
        />
        <Route
          path="/payment"
          element={
            <ClientLayout>
              <PaymentStep />
            </ClientLayout>
          }
        />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="eyeglasses" element={<Eyeglasses />} />
          <Route path="lenses" element={<Lenses />} />
          <Route path="users" element={<Users />} />
        </Route>
        <Route path="/select-lenses/:id" element={<SelectLenses />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
