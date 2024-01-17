import { createPortal } from "react-dom";
import { forwardRef, useContext, useState } from "react";
import { CheckoutFormInput } from "./CheckoutFormInput.jsx";
import { CartContext } from "../store/shopping-cart-context.jsx";
import { placeOrder } from "../hooks/httpCalls.js";
import {FaSpinner} from "react-icons/fa6";

export const CheckoutForm = forwardRef((props, ref) => {
  const { items, totalAmount } = useContext(CartContext);
  const [didEdit, setDidEdit] = useState({
    fullName: false,
    email: false,
    street: false,
    postalCode: false,
    city: false
  });
  const [customerData, setCustomerData] = useState({
    fullName: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  });
  const [placingOrder, setPlacingOrder] = useState(false);
  const [errorPlacingOrder, setErrorPlacingOrder] = useState(undefined);
  const [successfullyPlacedOrder, setSuccessfullyPlacedOrder] = useState(false);

  function handleCustomerChange(identifier, data) {
    setCustomerData((prevState) => {
      return {
        ...prevState,
        [identifier]: data,
      };
    });

    setDidEdit(prevState => {
      return {
        ...prevState,
        [identifier]: false
      }
    });
  }

  function handleCustomerBlur(identifier) {
    setDidEdit(prevState => {
      return {
        ...prevState,
        [identifier]: true
      }
    });
  }

  const nameIsValid = didEdit.fullName && customerData.fullName.length > 0 || !didEdit.fullName;
  const emailIsValid = didEdit.email && customerData.email.length > 0 && customerData.email.includes('@') || !didEdit.email;
  const streetIsValid = didEdit.street && customerData.street.length > 0 || !didEdit.street;
  const postalCodeIsValid = didEdit.postalCode && customerData.postalCode.length > 0 || !didEdit.postalCode;
  const cityIsValid = didEdit.city && customerData.city.length > 0 || !didEdit.city;

  async function _placeOrder(data) {
    try {
      setPlacingOrder(true);
      await placeOrder({
        order: {
          items: items,
          customer: {
            name: customerData.fullName,
            email: customerData.email,
            street: customerData.street,
            "postal-code": customerData.postalCode,
            city: customerData.city,
          },
        },
      });
      setSuccessfullyPlacedOrder(true);
      setErrorPlacingOrder(undefined);
    } catch (error) {
      console.error(error);
      setErrorPlacingOrder(error.message)
    } finally {
      setPlacingOrder(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    _placeOrder();
  }

  function handleClose() {
    ref.current.close();
    setSuccessfullyPlacedOrder(false);
  }

  return createPortal(
    <dialog ref={ref} className="modal w-[35rem] rounded-md p-4 bg-gray-200">
      <h1 className="text-2xl">Checkout</h1>
      <hr className="h-[3px] bg-gray-800 my-2" />
      <p className="my-2">Total Amount: ${totalAmount.toFixed(2)}</p>
      <hr className="h-[3px] bg-gray-800 my-2" />
      <form method="dialog" onSubmit={handleSubmit}>
        <CheckoutFormInput
          label="Full Name"
          hasError={!nameIsValid}
          errorMessage="Please enter a valid name. Length must be greater than 0"
          onBlur={() => handleCustomerBlur("fullName")}
          onChange={(event) =>
            handleCustomerChange("fullName", event.target.value)
          }
        />
        <CheckoutFormInput
          label="E-mail Address"
          hasError={!emailIsValid}
          errorMessage="Please enter a valid email. Length must be greater than 0 and must include an @ symbol."
          onBlur={() => handleCustomerBlur("email")}
          onChange={(event) =>
            handleCustomerChange("email", event.target.value)
          }
        />
        <div className="flex mr-4">
          <CheckoutFormInput
            className="w-1/3"
            label="Street"
            hasError={!streetIsValid}
            errorMessage="Please enter a valid street. Length must be greater than 0."
            onBlur={() => handleCustomerBlur("street")}
            onChange={(event) =>
              handleCustomerChange("street", event.target.value)
            }
          />
          <CheckoutFormInput
            className="w-1/3 mx-2"
            label="Postal Code"
            hasError={!postalCodeIsValid}
            errorMessage="Please enter a valid postal code. Length must be greater than 0."
            onBlur={() => handleCustomerBlur("postalCode")}
            onChange={(event) =>
              handleCustomerChange("postalCode", event.target.value)
            }
          />
          <CheckoutFormInput
            className="w-1/3"
            label="City"
            hasError={!cityIsValid}
            errorMessage="Please enter a valid city. Length must be greater than 0."
            onBlur={() => handleCustomerBlur("city")}
            onChange={(event) =>
              handleCustomerChange("city", event.target.value)
            }
          />
        </div>

        {errorPlacingOrder && (
          <div className="flex place-content-end">
            <p className="text-red-600 text-xl">
              {errorPlacingOrder}
            </p>
          </div>
        )}

        {successfullyPlacedOrder && (
          <div className="flex place-content-end">
            <p className="text-green-600 text-xl">
              Order placed!
            </p>
          </div>
        )}

        <div className="flex place-content-end mt-4">
          <button type="button" onClick={handleClose}>Close</button>

          <div className="bg-yellow-400 text-black py-2 px-4 ml-4 flex">
            {placingOrder && <FaSpinner className="animate-spin self-center mr-2"/>}
            <button type="submit" >
              Submit Order
            </button>
          </div>
        </div>
      </form>
    </dialog>,
    document.getElementById("modal"),
  );
});
