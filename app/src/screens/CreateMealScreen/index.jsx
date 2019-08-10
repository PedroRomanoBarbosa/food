import React, { Component } from 'react';
import withFormik from 'formik';

import MealForm from '../../components/MealForm';
import { SCREENS } from '../../App';

import './styles.css';

class CreateMealScreen extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
  }

  submit() {
    this.form.current.submit();
  }

  render() {
    const {
      navigation: {
        navigate,
      }
    } = this.props;
    return (
      <div className="screen create-meal-screen__container">
        <div className="create-meal-screen__content">
          <div
            className="create-meal-screen__back"
            onClick={() => navigate(SCREENS.MAIN)}
          >
            Back
          </div>
          <MealForm ref={this.form}/>
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