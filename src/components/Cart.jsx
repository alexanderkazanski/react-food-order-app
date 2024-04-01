import React from "react";
import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "./util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const { items, addItem, deleteItem } = useContext(CartContext);
  const { progress, hideCart, showCheckout } = useContext(UserProgressContext);

  function handleCloseCart() {
    hideCart();
  }

  const cartTotal = items.reduce(
    (totalPrice, { quantity, price }) => totalPrice + quantity + Number(price),
    0
  );

  function handelGoToCheckout() {
    showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => {
          return (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => addItem(item)}
              onDecrease={() => deleteItem(item.id)}
            />
          );
        })}
      </ul>

      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handelGoToCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
