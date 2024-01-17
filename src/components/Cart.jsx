// dit moet een modal worden
import { forwardRef, useContext } from "react";
import { createPortal } from "react-dom";
import { CartContext } from "../store/shopping-cart-context.jsx";

export const Cart = forwardRef(({ onShowCheckoutForm }, ref) => {
  const { items, addItem, removeItem, totalAmount } = useContext(CartContext);

  return createPortal(
    <dialog ref={ref} className="modal w-[35rem] rounded-md p-4 bg-gray-200">
      <h1 className="text-2xl">Your Cart</h1>
      <hr className="h-[3px] bg-gray-800 my-2" />
      <form method="dialog">
        {items.map((item) => (
          <div key={item.item.id} className="flex place-content-between my-4">
            <p>
              {item.item.name} - {item.amount} x ${item.item.price}
            </p>

            <div className="flex">
              <button
                type="button"
                onClick={() => removeItem(item.item.id)}
                className="rounded-full bg-black text-white w-[24px]"
              >
                -
              </button>
              <p className="mx-2">{item.amount}</p>
              <button
                type="button"
                onClick={() => addItem(item.item)}
                className="rounded-full bg-black text-white w-[24px]"
              >
                +
              </button>
            </div>
          </div>
        ))}
        <hr className="h-[3px] bg-gray-800 my-2" />
        <p>${totalAmount.toFixed(2)}</p>
        <hr className="h-[3px] bg-gray-800 my-2" />
        <div className="flex place-content-end">
          <button className="mr-2">Close</button>
          <button
            className="bg-yellow-400 py-2 px-4"
            type="button"
            onClick={onShowCheckoutForm}
          >
            Go to Checkout
          </button>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal"),
  );
});
