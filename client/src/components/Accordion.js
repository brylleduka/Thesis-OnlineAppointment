import React, { useState, useRef, useEffect } from "react";
import { ArrowRight } from "styled-icons/material";
import { DAccordion } from "./styled/utils";

const Accordion = (props) => {
  const [active, setActive] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toggleActive = () => {
    setActive(!active);
  };

  return (
    <DAccordion
      fs={props.fs}
      uc={props.uc}
      bg={props.bg}
      color={props.color}
      hoverColorText={props.hcolor}
      rounded={props.rounded}
      oblong={props.oblong}
    >
      <div
        className={active ? "accordion-title active" : "accordion-title"}
        onClick={toggleActive}
      >
        <p>
          <span className="acc-icon">{props.icon}</span>
          {props.title}
        </p>
        <ArrowRight
          size="18px"
          className={active ? "accordion-icon rotate" : "accordion-icon"}
        />
      </div>

      <div ref={contentRef} className="accordion-content">
        {props.children}
      </div>
    </DAccordion>
  );
};

export default Accordion;
