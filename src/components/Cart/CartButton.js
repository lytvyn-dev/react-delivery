import React, { useContext, useState, useEffect } from "react";

import style from "./CartButton.module.css";

import CartIcon from "./CartIcon";
import CartContext from "../../store/cart-context";

const CartButton = (props) => {
  const context = useContext(CartContext);
  const [animation, setAnimation] = useState(false);

  const { items } = context;

  useEffect(() => {
    if (items.length === 0) return;
    setAnimation(true);
    const timer = setTimeout(() => {
      setAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numberOfCartItems = context.items.reduce((acc, item) => {
    return (acc += item.amount);
  }, 0);

  return (
    <button onClick={props.onClick} className={`${style.button} ${animation ? style.bump : ""}`}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default CartButton;
