import React from "react";
import styled from "styled-components";
import { Camera } from "@styled-icons/boxicons-solid/Camera";

const CameraStyled = styled(Camera)`
  opacity: 0.8;
  cursor: pointer;
  margin: 12px 0;
  transition: all 0.5s ease;
  &:hover {
    opacity: 1;
    transform: scale(1.2);
  }
  &:focus {
    outline: 0;
  }
`;

const DCamera = (props) => {
  return (
    <span>
      <CameraStyled {...props} />
      {props.children}
    </span>
  );
};

export default DCamera;
