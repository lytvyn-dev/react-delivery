import React, { useContext, useState } from "react";

import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

import CartContext from "../../store/cart-context";

import styles from "./Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [checkOutIsVisible, setCheckOutIsVisible] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const validateOrderBtn = cartCtx.totalAmount > 0;

  const CartItemRemove = (id) => {
    cartCtx.removeItem(id);
  };
  const CartItemAdd = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const openCheckOut = () => {
    setCheckOutIsVisible(true);
  };

  const cancelCheckOut = () => {
    setCheckOutIsVisible(false);
  };

  const submitCheckoutHandler = (inputsValue) => {
    fetch("https://react-app-9a38a-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: inputsValue,
        meals: cartCtx.items,
      }),
    });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((el) => {
        return (
          <CartItem
            name={el.name}
            key={el.id}
            amount={el.amount}
            price={el.price}
            onRemove={CartItemRemove.bind(null, el.id)}
            onAdd={CartItemAdd.bind(null, el)}
          />
        );
      })}
    </ul>
  );

  if (checkOutIsVisible) {
    return (
      <Modal onClick={props.onCloseCart}>
        {cartItems}
        <div className={styles.total}>
          <div>Total Amount</div>
          <div>{totalAmount}</div>
        </div>
        <CheckOut onSubmitCheckout={submitCheckoutHandler} onCancelCheckOut={cancelCheckOut} />
      </Modal>
    );
  }

  return (
    <Modal onClick={props.onCloseCart}>
      {cartItems}
      <div className={styles.total}>
        <div>Total Amount</div>
        <div>{totalAmount}</div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onCloseCart} className={styles["button--alt"]}>
          Close
        </button>
        {validateOrderBtn && (
          <button onClick={openCheckOut} className={styles.button}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
