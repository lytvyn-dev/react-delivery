import { useRef, useState } from "react";

import style from "./CheckOut.module.css";

const isValid = (value) => value.trim() !== "";
const isEmpty = (value) => value.trim().length === 5;

const CheckOut = (props) => {
  //? Hooks
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const inputNameRef = useRef();
  const inputStreetRef = useRef();
  const inputPostalRef = useRef();
  const inputCityRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    const inputNameValue = inputNameRef.current.value;
    const inputStreetValue = inputStreetRef.current.value;
    const inputPostalValue = inputPostalRef.current.value;
    const inputCityValue = inputCityRef.current.value;

    const nameIsValid = isValid(inputNameValue);
    const streetIsValid = isValid(inputStreetValue);
    const postalIsValid = isEmpty(inputPostalValue);
    const cityIsValid = isValid(inputCityValue);

    const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    if (!formIsValid) {
      return;
    }

    props.onSubmitCheckout({
      name: inputNameValue,
      street: inputStreetValue,
      postal: inputPostalValue,
      city: inputCityValue,
    });

    inputNameRef.current.value = "";
    inputStreetRef.current.value = "";
    inputPostalRef.current.value = "";
    inputCityRef.current.value = "";
  };

  //? Inputs dynamic styles
  const nameStyleValidity = formInputsValidity.name
    ? style.control
    : `${style.control} ${style.invalid}`;
  const streetStyleValidity = formInputsValidity.street
    ? style.control
    : `${style.control} ${style.invalid}`;
  const postalStyleValidity = formInputsValidity.postal
    ? style.control
    : `${style.control} ${style.invalid}`;
  const cityStyleValidity = formInputsValidity.city
    ? style.control
    : `${style.control} ${style.invalid}`;

  return (
    <form className={style.form} onSubmit={submitFormHandler} action="#">
      <div className={nameStyleValidity}>
        <label htmlFor="name">Name</label>
        <input ref={inputNameRef} id="name" type="text" />
        {formInputsValidity.name || <p> Name should not be an empty string</p>}
      </div>
      <div className={streetStyleValidity}>
        <label htmlFor="street">Street</label>
        <input ref={inputStreetRef} id="street" type="text" />
        {formInputsValidity.street || <p>Street should not be an empty string</p>}
      </div>
      <div className={postalStyleValidity}>
        <label htmlFor="postal code">Postal code</label>
        <input ref={inputPostalRef} id="postal code" type="text" />
        {formInputsValidity.postal || <p>Postal code should include 5 characters</p>}
      </div>
      <div className={cityStyleValidity}>
        <label htmlFor="city">City</label>
        <input ref={inputCityRef} id="city" type="text" />
        {formInputsValidity.city || <p>City should not be an empty string</p>}
      </div>
      <div className={style.actions}>
        <button className={style.submit} type="submit">
          Submit
        </button>
        <button onClick={props.onCancelCheckOut} type="button">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckOut;
