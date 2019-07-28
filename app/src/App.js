import React from "react";
import "./App.css";
import TodayMeal from "./components/TodayMeal";
import ShoppingList from "./components/ShoppingList";
import Loading from "./components/Loading";
import axios from "axios";
import moment from "moment";
import AddButton from "./components/AddButton";

const screens = {
  MAIN: "MAIN",
  ADD_MEAL: "ADD_MEAL",
};

moment.locale("pt", {
  weekdays: "Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado".split("_"),
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4 // Used to determine first week of the year.
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoading: true,
      screen: screens.MAIN,
    };
  }

  getInfo = async () => {
    await axios
      .get(`http://${window.location.hostname}:4000/weekly-shopping-list`)
      .then(response => {
        this.setState({
          data: response.data,
          isLoading: false
        });
      });
  };

  componentDidMount() {
    this.getInfo();
  }

  onAddMeal = () => {
    this.setState({
      screen: screens.ADD_MEAL,
    });
  }

  renderAddMeal() {
    return (
      <div>
        lol
      </div>
    );
  }

  renderMain() {
    const { data } = this.state;
    return (
      <div>
        <TodayMeal meals={data.meals} />
        <ShoppingList itemsList={data.itemsList} />
        <AddButton
          text="+ Adiconar Refeição"
          onClick={this.onAddMeal}
        />
      </div>
    );
  }

  render() {
    const { isLoading, screen } = this.state;
    return (
      <>
        {!isLoading ? (
          <>
            <div className="App">
            {screen === screens.MAIN && this.renderMain()}
            {screen === screens.ADD_MEAL && this.renderAddMeal()}
            </div>
          </>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

export default App;
