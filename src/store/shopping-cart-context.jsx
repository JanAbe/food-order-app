import { createContext } from "react";

export const CartContext = createContext({
  // om code-completion te krijgen in je IDE:
  items: [],
  addItem: () => {},
  removeItem: () => {},
  totalAmount: 0
});
