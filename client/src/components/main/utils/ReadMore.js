import React from "react";
import { ReadMore as RM } from "../../styled/utils";

const ReadMore = props => {
  return (
    <RM hover={props.hover}>
      <span>{props.children}</span>
    </RM>
  );
};

export default ReadMore;
