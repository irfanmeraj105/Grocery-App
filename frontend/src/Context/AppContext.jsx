import React, { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

// Capitalize the context name
export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(true);
  const [showUserLogin, setShowUserLogin] = useState(null);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [searchQuery, setSearchQuery] = useState([]);

  // add to cart function
  const addToCart = (itemId) => {
    const cartData = structuredClone(cart);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCart(cartData);
    toast.success("Product added to cart successfully!");
  };

  // update from cart function
  const updateCart = (itemId, quantity) => {
    const cartData = structuredClone(cart);

    cartData[itemId] = quantity;
    setCart(cartData);
    toast.success("Cart updated successfully!");
  };

  // total cart items

  const totalCartItems = () => {
    let total = 0;
    for (const item in cart) {
      total += cart[item];
    }
    return total;
  };

  // total cart amount
  const totalCartAmount = () => {
    let totalAmount = 0;
    for (const items in cart) {
      let itemInfo = products.find((item) => item._id === items);
      if (cart[items] > 0 && itemInfo) {
        totalAmount += cart[items] * itemInfo.offerPrice;
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  // remove from cart

  const removeFromCart = (itemId) => {
    const cartData = structuredClone(cart);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    }
    setCart(cartData);
    toast.success("Product removed from cart successfully!");
  };

  // fetch products data for the ui
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // fetch on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    addToCart,
    removeFromCart,
    totalCartAmount,
    updateCart,
    totalCartItems,
    cart,
    setCart,
    searchQuery,
    setSearchQuery,
  };

  // Use capitalized AppContext here
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Use named export for consistency
export default AppContextProvider;
