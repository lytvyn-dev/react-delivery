import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import MealItem from "./MealItem";

import styles from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  //? Hooks
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpErr, setHttpErr] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://react-app-9a38a-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) {
          throw new Error("Something were wrong 💥");
        }

        const data = await response.json();

        let items = [];
        for (const [id, obj] of Object.entries(data)) {
          items.push({ id: id, ...obj });
          setMeals(items);
          setIsLoading(false);
        }
      } catch (err) {
        setHttpErr(err.message);
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return (
    <section className={styles.meals}>
      <Card>
        {httpErr}
        {isLoading && <p>Loading...</p>}
        <ul>
          {meals.map((meal) => {
            return (
              <MealItem
                id={meal.id}
                key={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            );
          })}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
