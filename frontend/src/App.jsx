import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import MyOrders from "./pages/MyOrders";
import { AppContext } from "./Context/AppContext";
import Auth from "../models/auth";
import ProductCategory from "./pages/ProductCategory";
import Footer from "./components/Footer";
import AddAddress from "./pages/AddAddress";
import SellerLayout from "./pages/seller/SellerLayout";
import SellerLogin from "./components/seller/SellerLogin";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import Orders from "./pages/seller/Orders";

const App = () => {
  const { showUserLogin, isSeller } = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <div className="text-normal min-h-screen">
      {/* Show Navbar only if not in seller path */}
      {!isSellerPath && <Navbar />}

      {/* Show Login Modal if user login is required */}
      {showUserLogin && <Auth />}

      <div className="px-6 md:px-16 lg:px-24 xl:px-26">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/add-address" element={<AddAddress />} />

          {/* Seller Routes */}
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route
              path="product-list"
              element={isSeller ? <ProductList /> : null}
            />
            <Route path="orders" element={isSeller ? <Orders /> : null} />
          </Route>
        </Routes>
      </div>

      {/* Show Footer only if not in seller path */}
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
