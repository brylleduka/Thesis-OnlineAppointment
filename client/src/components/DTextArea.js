import React from "react";
import styled, { css } from "styled-components";

const DTextAreaStyled = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  height: auto;
  min-height: 30px;
  max-height: 250px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid rgba(189, 195, 199, 0.8);
  border-radius: 5px;
  padding: 5px;

  ${(props) =>
    props.par &&
    css`
      height: 250px;
    `};
`;

const DTextArea = (props) => {
  return <DTextAreaStyled {...props}>{props.children}</DTextAreaStyled>;
};

export default DTextArea;
