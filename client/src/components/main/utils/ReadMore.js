import React from "react";
import { ReadMore as RM } from "../../styled/utils";

const ReadMore = props => {
  return (
    <RM {...props}>
      <span>{props.children}</span>
    </RM>
  );
};

export default ReadMore;
