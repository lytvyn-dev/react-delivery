import React, { useRef } from "react";

import Input from "../UI/Input/Input";

import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const inputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const amount = inputRef.current.value;

    if (amount.trim().length === 0 || amount > 5 || amount < 1) {
      return;
    }
    props.onSetAmount(+amount);
  };

  return (
    <form onSubmit={submitHandler} action="#" className={styles.form}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: `amount_${props.id}`,
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  );
};

export default MealItemForm;
