import React, { Component } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';

import TextInput from '../TextInput';

import "./styles.css";


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
  
  submit = () => {
    this.formik.submitForm();
  }

  render() {
    return (
      <div className="meal-form__container">
        <div className="meal-form__title">Cria a uma refeição!</div>
        <Formik
          ref={(_ref) => this.formik = _ref}
          initialValues={{
            name: '',
            ingredients: [{
              id: 'efwef',
              quantity: 2,
            }],
          }}
          validationSchema={schema}
          onSubmit={(values, actions) => {
            console.log('onSubmit');
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
                </div>
                {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                {/** TODO: Do Selection List */}
              </form>
            );
          }}
        />
      </div>
    );
  }
}
 
export default MealForm;