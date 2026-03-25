import { createContext, useState } from "react";

export const CartContext = createContext<any>(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item) => setCart(cart.concat([item]));

  return (
    <CartContext.Provider value={{ cart, setCart, addItem }}>
      {children}
    </CartContext.Provider>
  );
};
