import React, { useContext } from "react";
import Modal from "./UI/Modal";
import Error from "./Error";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "./util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { items, clearCart } = useContext(CartContext);
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
  } = useHttp("http://localhost:3000/orders", requestConfig, []);

  const cartTotal = items.reduce(
    (totalPrice, { quantity, price }) => totalPrice + quantity + Number(price),
    0
  );

  function handelClose() {
    hideCheckout("");
  }

  async function handelSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      })
    );
  }

  function handelFinish() {
    hideCheckout();
    clearCart();
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handelClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data.message === "Order created!" && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handelFinish}>
        <h2>Success!</h2>
        <p>Your order was subimtted Successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minuets.
        </p>
        <p className="modal-actions">
          <Button onClick={handelFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={handelClose}>
      <form onSubmit={handelSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full name" type="text" id="name" />
        <Input label="Email address" id="email" type="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="City" type="text" id="city" />
          <Input label="Postal Code" type="text" id="postal-code" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
