import React, { Fragment } from "react";

import styles from "./Header.module.css";
import headerImage from "../../img/meals.jpeg";

import CartButton from "../Cart/CartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={`${styles.header}`}>
        <h2>ReactMeals</h2>
        <CartButton onClick={props.onCartStateHandler} />
      </header>
      <div className={`${styles["main-image"]}`}>
        <img src={headerImage} alt="Many diffent food, we can deliver to you" />
      </div>
    </Fragment>
  );
};

export default Header;
