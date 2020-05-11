import React from "react";
import { RadioStyle } from "./styled/inputs";
import styled from "styled-components";

const RadioGroupStyle = styled.div`
  display: flex;
  margin-bottom: 36px;
  overflow: hidden;
`;

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
