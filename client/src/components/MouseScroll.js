import React from "react";
import { DMouseScroll } from "./styled/scroll.styled";

const MouseScroll = props => {
  return (
    <DMouseScroll {...props}>
      <div class="scroll-downs">
        <div class="mousey">
          <div class="scroller"></div>
        </div>
      </div>
    </DMouseScroll>
  );
};

export default MouseScroll;
