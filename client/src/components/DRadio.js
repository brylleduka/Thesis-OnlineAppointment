import React from "react";
import { RadioStyle, RadioGroupStyle } from "./styled/inputs";

const RadioGroup = (props) => {
  return <RadioGroupStyle>{props.children}</RadioGroupStyle>;
};

const RadioInput = (props) => {
  return (
    <RadioStyle>
      <input type="radio" className="radio" {...props} />
      <label className="radio-label" htmlFor={props.id}>
        {props.label}
      </label>
    </RadioStyle>
  );
};

export default { RadioInput, RadioGroup };
