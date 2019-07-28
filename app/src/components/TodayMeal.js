import React from "react";
import "./TodayMeal.css";
import moment from "moment";

const SideButton = ({
  text,
  onClick,
}) => {
  return (
    <div className="side-button" onClick={onClick}>
      <div className="TodayMealButton">
        {text}
      </div>
      <div className="side-button-overlay" />
    </div>
  );
}

class TodayMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: moment(),
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
      <div className="TodayMeal">
        <SideButton
          text="<"
          onClick={this.previousDay}
        />
        <div className="TodayMealActions">
          {/* TODO: "Hoje, amanhã, depois de amanhã, ontem..." */}
          <p className="TodayMealDate">{day.format("dddd")}</p>
          {/* <h2 className="TodayMealDesc">Refeição de Hoje</h2> Não acho necessário */}
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
        <SideButton
          text=">"
          onClick={this.nextDay}
        />
      </div>
    );
  }
}

export default TodayMeal;
