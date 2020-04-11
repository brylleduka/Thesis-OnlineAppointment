import React from "react";
import { Toasted as Toast } from "./styled/utils";
import { Close } from "@styled-icons/material/Close";

const Toasted = (props) => {
  return (
    <Toast {...props}>
      <span className="description">{props.children}</span>
      <span className="close">
        <Close size="14px" />
      </span>
    </Toast>
  );
};

export default Toasted;
