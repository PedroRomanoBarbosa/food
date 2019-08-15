import React, { Component } from 'react';
import axios from 'axios';

import MealForm from '../../components/MealForm';
import { SCREENS } from '../../App';

import './styles.css';

class CreateMealScreen extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
  }

  state = {
    allIngredients: [],
    selectedIngredients: [],
  };

  componentDidMount() {
    this.getAllIngredients();
  }

  getAllIngredients = async () => {
    const result = await axios.get(`http://${window.location.hostname}:4000/items`);
    this.setState({
      allIngredients: result.data,
    });
  };

  submit() {
    console.log(this.form);
    this.form.current.submit();
  }

  render() {
    const {
      navigation: {
        navigate,
      }
    } = this.props;
    const {
      allIngredients,
      selectedIngredients,
    } = this.state;
    return (
      <div className="screen create-meal-screen__container">
        <div className="create-meal-screen__content">
          <div
            className="create-meal-screen__back"
            onClick={() => navigate(SCREENS.MAIN)}
          >
            Back
          </div>
          <MealForm
            ref={this.form}
            ingredientsList={allIngredients}
            ingredients={selectedIngredients}
          />
        </div>
        <button
          onClick={() => this.submit()}
          className="create-meal-screen__submit-button"
        >
          Submit
        </button>
      </div>
    );
  }
}
 
export default CreateMealScreen;