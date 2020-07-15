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

interface Props {
  name: string,
  ingredientsList: any[],
}

interface State {
  ingredients: any[]
}

class MealForm extends Component<Props> {
  state = {
    ingredients: [],
  } as State;
  formik?: any = null;
  form?: any = null;

  submit = () => {
    if (this && this.formik) {
      this.formik.submitForm();
    }
  }

  get ingredients() {
    return this.state.ingredients;
  }

  addItem(ingredient: any) {
    const index = this.ingredients.findIndex(e => e._id === ingredient._id);
    const exists = index !== -1;
    if (exists) {
      this.setState({
        ingredients: [
          ...this.ingredients.slice(0, index),
          {
            ...this.ingredients[index],
            quantity: this.ingredients[index].quantity + 1,
          },
          ...this.ingredients.slice(index + 1, this.ingredients.length - 1),
        ],
      });
    } else {
      this.setState({
        ingredients: [
          ...this.ingredients,
          {
            ...ingredient,
            quantity: 0,
          },
        ],
      });
    }
  }

  public removeIngredient(ingredient: any): any {
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
                  <div className="meal-form__ingredients_title meal-form__margin_top">Ingredientes</div>
                  <SearchList
                    items={ingredientsList}
                    onItemAdd={(item: any) => this.addItem(item)}
                    onItemSubtract={(item: any) => this.removeIngredient(item)}
                    selectedItemValue={(item: any) => item.name}
                    selectedItemQuantity={(item: any) => item.quantity}
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