import React from "react";
import { SpinnerRing } from "./styled/loader";
const Spinner = (props) => {
  return (
    <SpinnerRing {...props}>
      <div className="ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="content-text">{props.content}</div>
    </SpinnerRing>
  );
};

export default Spinner;
