import React from "react";
import { DFancyText } from "./styled/text";

const FancyText = (props) => {
  return <DFancyText {...props}>{props.children}</DFancyText>;
};

export default FancyText;
