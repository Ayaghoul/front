import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import AdminProductsPage from "./pages/AdminProductsPage";

const App = () => {
  return (
    <>
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin" element={<h1>👑 Espace Admin</h1>} />
          <Route path="/account" element={<h1>👤 Espace Client</h1>} />
        </Routes>
      </ErrorBoundary>
    </>
  );
};

export default App;
