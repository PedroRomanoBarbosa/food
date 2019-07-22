import React from "react";
import "./TodayMeal.css";
import moment from "moment";

const TodayMeal = props => {
  const { meal } = props;
  return (
    <>
      <div className="TodayMeal">
        <p className="TodayMealDate">{moment().format("dddd")}</p>
        <h2 className="TodayMealDesc">Refeição de Hoje</h2>
        <h1 className="TodayMealTitle">{meal.name}</h1>
        <div className="TodayMealIngr">
          {meal.ingredients.map(ingredient => {
            return (
              <p className="TodayMealIngrText" key={ingredient.id}>
                {`${ingredient.quantity} ${ingredient.quantityType} ${
                  ingredient.name
                }`}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TodayMeal;
