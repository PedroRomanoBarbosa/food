import React from "react";
import "./App.css";
import TodayMeal from "./components/TodayMeal";
import ShoppingList from "./components/ShoppingList";
import PrintButton from "./components/PrintButton";
import Loading from "./components/Loading";
import axios from "axios";
import moment from "moment";
import AddButton from "./components/AddButton";
import CreateMealScreen from "./screens/CreateMealScreen";
import PrintCartScreen from "./screens/PrintCartScreen";
import { PrintFormatter } from "./components/PrinterFormatter";

export const SCREENS = {
  MAIN: "MAIN",
  PRINT: "PRINT_CART",
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
      screen: SCREENS.MAIN,
    };
  }

  navigation = {
    navigate: screen => {
      this.setState({ screen });
    },
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

  onPrintShoppingList = async () => {
    await this.setState({
      screen: SCREENS.PRINT,
    });
    window.print();
    this.setState({
      screen: SCREENS.MAIN,
    });
    window.close();
  }

  onAddMeal = () => {
    this.setState({
      screen: SCREENS.ADD_MEAL,
    });
  }

  renderAddMeal() {
    return (
      <div>
        <CreateMealScreen
          navigation={this.navigation}
        />
      </div>
    );
  }

  renderPrintCart() {
    return (
      <div>
        <PrintCartScreen
          navigation={this.navigation}
          itemsList={this.state.data.itemsList}
        />
      </div>
    )
  }

  renderMain() {
    const { data } = this.state;
    return (
      <div>
        <TodayMeal meals={data.meals} />
        <ShoppingList itemsList={data.itemsList} />
        <PrintButton
          onClick={this.onPrintShoppingList}
        />
        <AddButton
          text="+ Adicionar Refeição"
          onClick={this.onAddMeal}
        />
      </div>
    );
  }

  render() {
    const { isLoading, screen } = this.state;
    return (
      <div>
        {!isLoading ? (
          <>
            <div className="App">
              {screen === SCREENS.MAIN && this.renderMain()}
              {screen === SCREENS.ADD_MEAL && this.renderAddMeal()}
              {screen === SCREENS.PRINT && this.renderPrintCart()}
            </div>
          </>
        ) : (
            <Loading />
          )}
      </div>
    );
  }
}

export default App;
