import React from "react";
import "./App.css";
import TodayMeal from "./components/TodayMeal";
import ShoppingList from "./components/ShoppingList";
import Loading from "./components/Loading";
import axios from "axios";
import moment from "moment";

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
      isLoading: true
    };
  }

  getInfo = async () => {
    await axios
      .get("http://localhost:4000/weekly-shopping-list")
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

  render() {
    const { data, isLoading } = this.state;
    return (
      <>
        {!isLoading ? (
          <>
            <div className="App">
              <TodayMeal meal={data.meals[moment().weekday()]} />
              <ShoppingList itemsList={data.itemsList} />
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
