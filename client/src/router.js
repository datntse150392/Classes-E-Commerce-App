import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import LoginForm from "./components/Client/LoginForm";
import Homepage from "./pages/Client/HomePage";
import SignUpForm from "./components/Client/SignUpForm";
import ProductDetail from "./components/Client/ProductDetail";
import CheckoutStep from "./components/Client/CheckoutStep";
import PaymentStep from "./components/PaymentStep";
import CartStep from "./components/Client/CartStep";

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
      </Routes>
    </Router>
  );
};

export default AppRoutes;
