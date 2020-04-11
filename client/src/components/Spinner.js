import React from "react";
import { SpinnerRing } from "./styled/loader";
const Spinner = (props) => {
  return (
    <div style={styled}>
      <SpinnerRing {...props}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </SpinnerRing>
      <div style={{ fontWeight: 700 }}>{props.content}</div>
    </div>
  );
};

const styled = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexDirection: "column",
};

export default Spinner;
