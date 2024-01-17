import { Meals } from "./components/Meals.jsx";
import { Header } from "./components/Header.jsx";
import { useRef, useState } from "react";
import { CheckoutForm } from "./components/CheckoutForm.jsx";
import { Cart } from "./components/Cart.jsx";
import { CartContext } from "./store/shopping-cart-context.jsx";
import { Notification } from "./components/Notification.jsx";
import { useTimer } from "./hooks/hooks.js";

function App() {
  const checkoutForm = useRef();
  const cart = useRef();
  const [cartState, setCartState] = useState({
    items: [],
    totalAmount: 0.0,
  });
  const { showNotification, totalTime, currentValue } = useTimer(15);

  function handleShowCheckoutForm() {
    cart.current.close();
    checkoutForm.current.showModal();
  }

  function handleShowCart() {
    cart.current.showModal();
  }

  function handleAddItem(item) {
    setCartState((prevState) => {
      const index = prevState.items.findIndex(
        (value) => value.item.id === item.id,
      );
      if (index === -1) {
        return {
          items: [...prevState.items, { item: item, amount: 1 }],
          totalAmount: prevState.totalAmount + +item.price,
        };
      }

      const foundItem = prevState.items[index];
      // verwijder het gevonden item uit de array
      const updatedItems = prevState.items.filter((item, i) => i !== index);
      return {
        // voeg het gevonden item opnieuw toe aan de array maar met een aangepaste amount
        items: [
          ...updatedItems,
          { item: foundItem.item, amount: foundItem.amount + 1 },
        ],
        totalAmount: prevState.totalAmount + +item.price,
      };
    });
  }

  function handleRemoveItem(id) {
    setCartState((prevState) => {
      const index = prevState.items.findIndex((value) => value.item.id === id);

      const foundItem = prevState.items[index];
      const updatedItems = prevState.items.filter((item, i) => i !== index);
      if (foundItem.amount === 1) {
        return {
          items: updatedItems,
          totalAmount: prevState.totalAmount - +foundItem.item.price,
        };
      }

      return {
        items: [
          ...updatedItems,
          { item: foundItem.item, amount: foundItem.amount - 1 },
        ],
        totalAmount: prevState.totalAmount - +foundItem.item.price,
      };
    });
  }

  const ctxValue = {
    items: cartState.items,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    totalAmount: cartState.totalAmount,
  };

  return (
    <CartContext.Provider value={ctxValue}>
      <div className="bg-gray-700">
        <Header onShowCart={handleShowCart} />
        <main className="mx-56">
          <div className="flex place-content-center">
            {showNotification && (
              <Notification
                message={"Welcome to the website!"}
                total={totalTime}
                currentValue={currentValue}
              />
            )}
          </div>
          <Meals />
          <Cart ref={cart} onShowCheckoutForm={handleShowCheckoutForm} />
          <CheckoutForm ref={checkoutForm} />
        </main>
      </div>
    </CartContext.Provider>
  );
}

export default App;
