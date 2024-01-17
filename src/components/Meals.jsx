import { useContext, useEffect, useState } from "react";
import { getMeals } from "../hooks/httpCalls.js";
import { CartContext } from "../store/shopping-cart-context.jsx";
import {FaSpinner} from "react-icons/fa6";

export const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(undefined);
  const [fetchingMeals, setFetchingMeals] = useState(false);

  const cartContext = useContext(CartContext);

  useEffect(() => {
    async function fetchMeals() {
      try {
        setFetchingMeals(true);
        const result = await getMeals();
        setMeals(result);
      } catch (error) {
        setError(error);
      } finally {
        setFetchingMeals(false);
      }
    }

    fetchMeals();
  }, []);

  return (
    <>
      { fetchingMeals &&
        <div className="flex place-content-center fixed top-1/2 left-1/2">
          <FaSpinner className="animate-spin" size={40}/>
        </div>
      }

      <div className="flex flex-wrap place-content-center">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="w-[25rem] bg-gray-800 m-2 text-white text-center"
          >
            <img src={`http://localhost:3000/${meal.image}`} alt="food image" />
            <h3 className="text-2xl">{meal.name}</h3>
            <p className="text-xl bg-gray-900 font-bold text-yellow-400">
              ${meal.price}
            </p>
            <p className="p-4">{meal.description}</p>
            <button
              className="bg-yellow-400 rounded-md text-black p-2 mb-2"
              onClick={() => cartContext.addItem(meal)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
