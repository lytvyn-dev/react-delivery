import React, { useContext } from "react";

import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

import styles from "./MealItem.module.css";

const MealItem = (props) => {
  const context = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const setAmountHandler = (amount) => {
    context.addItem({
      amount: amount,
      price: props.price,
      name: props.name,
      id: props.id,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <p className={styles.description}>{props.description}</p>
        <p className={styles.price}>{price}</p>
      </div>
      <div>
        <MealItemForm onSetAmount={setAmountHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
