import React, { createContext, useState, useEffect } from "react";

import {
  addItemToCart,
  removeItemFromCart,
  filterItemFromCart,
  getCartTotal,
  getCartItemsCount
} from "./cart.utils";

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
  total: 0
});

const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCartItemsCount(getCartItemsCount(cartItems));
    setTotal(getCartTotal(cartItems));
  }, [cartItems]);

  const addItem = cartItemToAdd =>
    setCartItems(addItemToCart(cartItems, cartItemToAdd));
  const removeItem = cartItemToRemove =>
    setCartItems(removeItemFromCart(cartItems, cartItemToRemove));
  const clearItemFromCart = cartItemToFilter =>
    setCartItems(filterItemFromCart(cartItems, cartItemToFilter));
  const toggleHidden = () => setHidden(!hidden);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        cartItems,
        addItem,
        removeItem,
        clearItemFromCart,
        cartItemsCount,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
