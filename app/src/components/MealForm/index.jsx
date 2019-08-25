import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import TextInput from '../TextInput';

import "./styles.css";
import SearchList from '../SearchList';


const schema = yup.object().shape({
  name: yup.string()
    .max(30, 'Nome demasiado longo!')
    .required('O nome é um campo obrigatório'),
  ingredients: yup.array().of(
    yup.object().shape({
      id: yup.string().required(),
      quantity: yup.number().required(),
    })
  ).required('Required'),
});

class MealForm extends Component {
  state = {
    ingredients: [],
  };
  submit = () => {
    this.formik.submitForm();
  }

  get ingredients() {
    return this.state.ingredients;
  }

  selectIngredient(ingredient) {
    if (this.ingredients.findIndex(e => e._id === ingredient._id) === -1) {
      this.setState({
        ingredients: [...this.ingredients, ingredient],
      });
    }
  }

  removeIngredient(ingredient) {
    this.setState({
      ingredients: this.ingredients.filter(i => {
        if (i._id === ingredient._id) {
          return false;
        }
        return true;
      }),
    });
  }

  render() {
    const {
      name,
      ingredientsList,
    } = this.props;
    const {
      ingredients,
    } = this.state;
    return (
      <div className="meal-form__container">
        <div className="meal-form__title">Cria uma refeição</div>
        <Formik
          ref={(_ref) => this.formik = _ref}
          initialValues={{
            name: name || '',
            ingredients: ingredients || [],
          }}
          validationSchema={schema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
          render={props => {
            return (
              <form ref={(_ref => { this.form = _ref })} onSubmit={props.handleSubmit}>
                <div className="food__input-container">
                  <TextInput
                    placeholder="Nome"
                    name="name"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.name}
                  />
                  {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                  {props.values.ingredients.map(selected => {
                    return (
                      <div>{selected.name}</div>
                    );
                  })}
                  <SearchList
                    items={ingredientsList}
                    onItemSelect={item => this.selectIngredient(item)}
                    onItemRemove={item => this.removeIngredient(item)}
                    selectedItemValue={item => item.name}
                    selectedItems={ingredients}
                  />
                </div>
              </form>
            );
          }}
        />
      </div>
    );
  }
}
 
export default MealForm;