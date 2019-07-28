import React from "react";
import "./TodayMeal.css";
import moment from "moment";

class TodayMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: moment()
    };
  }

  nextDay = () => {
    const { day } = this.state;
    const tommorow = day.clone();
    tommorow.add(1, "day");
    this.setState({
      day: tommorow
    });
  };

  previousDay = () => {
    const { day } = this.state;
    const yesterday = day.clone();
    yesterday.subtract(1, "day");
    this.setState({
      day: yesterday
    });
  };

  render() {
    const { meals } = this.props;
    const { day } = this.state;
    const meal = meals[day.weekday()];
    return (
      <>
        <div className="TodayMeal">
          <div className="TodayMealButton" onClick={this.previousDay}>
            {"<"}
          </div>
          <div className="TodayMealActions">
            <p className="TodayMealDate">{day.format("dddd")}</p>
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
          <div className="TodayMealButton" onClick={this.nextDay}>
            {">"}
          </div>
        </div>
      </>
    );
  }
}

export default TodayMeal;
