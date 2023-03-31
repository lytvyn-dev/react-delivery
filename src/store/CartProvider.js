import React, { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let updatedItems;
    let updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    const index = state.items.findIndex((el) => el.id === action.item.id);
    const cartItem = state.items[index];

    if (cartItem) {
      cartItem.amount += 1;
      updatedItems = [...state.items];
    }

    if (index < 0) updatedItems = [...state.items, action.item];

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    let updatedItems = state.items;

    const cartItemIndex = state.items.findIndex((el) => el.id === action.id);
    const cartItem = updatedItems[cartItemIndex];

    let updatedTotalAmount = state.totalAmount - cartItem.price;

    if (cartItem.amount === 1) updatedItems.splice(cartItem, 1);
    if (cartItem.amount > 1) cartItem.amount--;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
};

const CartProvider = (props) => {
  const [cartItemState, dispatchItemState] = useReducer(cartReducer, defaultCartState);

  const addItemCartHandler = (item) => {
    dispatchItemState({ type: "ADD", item: item });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchItemState({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartItemState.items,
    totalAmount: cartItemState.totalAmount,
    addItem: addItemCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>;
};

export default CartProvider;
