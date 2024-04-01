import React from "react";
import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UserProgressContext);

  function handelShowCart() {
    showCart();
  }

  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);
  const cartButtonText = `Cart (${totalCartItems})`;
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A resterant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly={true} onClick={handelShowCart}>
          {cartButtonText}
        </Button>
      </nav>
    </header>
  );
}

// const password = "aaaaaA#!1"
