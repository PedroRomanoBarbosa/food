import React from 'react';

import "./styles.css";

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const TextInput = (props) => {
  let { value } = props;
  value = capitalize(value);
  return (
    <div className="text-input__container">
      <input
        className="text-input__input"
        {...props}
        value={value}
      />
    </div>
  );
}
 
export default TextInput;