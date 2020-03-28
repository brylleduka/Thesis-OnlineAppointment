import React from "react";
import { DMouseScroll } from "./styled/scroll.styled";

const MouseScroll = props => {
  return (
    <DMouseScroll {...props}>
      <div className="scroll-downs">
        <div className="mousey">
          <div className="scroller"></div>
        </div>
      </div>
    </DMouseScroll>
  );
};

export default MouseScroll;
