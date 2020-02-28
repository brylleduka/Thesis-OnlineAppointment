import React from "react";
import { SpinnerRing } from "./styled/loader";
const Spinner = ({ small, large, medium, inverted }) => {
  return (
    <SpinnerRing
      small={small}
      large={large}
      medium={medium}
      inverted={inverted}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </SpinnerRing>
  );
};

export default Spinner;
