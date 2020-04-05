import React from "react";
import { SpinnerRing } from "./styled/loader";
const Spinner = (props) => {
  return (
    <SpinnerRing {...props}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </SpinnerRing>
  );
};

export default Spinner;
