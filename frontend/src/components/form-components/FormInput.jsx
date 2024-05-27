import React from "react";
import { useState } from "react";

const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="form-input">
      <label htmlFor={inputProps.name}>{props.label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        focused={focused.toString()}
      // className={className}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
