import logo from "../assets/logo.jpg";
import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context.jsx";
import {FaCartShopping} from "react-icons/fa6";
export const Header = ({ onShowCart }) => {
  const cartContext = useContext(CartContext);

  return (
    <nav className="bg-gray-800">
      <ul className="flex place-content-between mx-48">
        <li>
          <img src={logo} alt="logo" className="w-[4rem] h-[4-rem]" />
        </li>
        <li className="self-center mr-4 bg-gray-600 p-2 w-[10rem] rounded-full hover:bg-gray-700 flex place-content-center hover:cursor-pointer" onClick={onShowCart}>
          <i className="text-yellow-400 self-center mr-2">
            <FaCartShopping/>
          </i>
          <button className="text-xl text-yellow-400 self-center">
            Cart (
            {cartContext.items.reduce(
              (acc, currentValue) => acc + currentValue.amount,
              0,
            )}
            )
          </button>
        </li>
      </ul>
    </nav>
  );
};
