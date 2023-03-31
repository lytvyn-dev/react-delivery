import React, { useContext } from "react";

import Modal from "../UI/Modal/Modal";
import CartItem from "./CartItem";

import CartContext from "../../store/cart-context";

import styles from "./Cart.module.css";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const validateOrderBtn = cartCtx.totalAmount > 0;

  const CartItemRemove = (id) => {
    cartCtx.removeItem(id);
  };
  const CartItemAdd = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
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
        {validateOrderBtn && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
