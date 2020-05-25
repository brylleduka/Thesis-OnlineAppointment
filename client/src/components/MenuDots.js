import React from "react";
import styled, { css } from "styled-components";
import { DotsVerticalRounded } from "@styled-icons/boxicons-regular/DotsVerticalRounded";
import { IconWrap } from "./styled/utils";
import { Popup } from "semantic-ui-react";

const MenuStyledDots = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  z-index: 5;
  ${(props) =>
    props.middle &&
    css`
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `};
  ${(props) =>
    props.topright &&
    css`
      top: 0;
      right: 0;
    `};
  ${(props) =>
    props.topleft &&
    css`
      top: 0;
      left: 0;
    `};
  ${(props) =>
    props.bottomright &&
    css`
      bottom: 0;
      right: 0;
    `};
  ${(props) =>
    props.middleright &&
    css`
      top: 0;
      bottom: 0;
      right: 0;
    `};
  ${(props) =>
    props.bottomleft &&
    css`
      bottom: 0;
      left: 0;
    `};
  ${(props) =>
    props.middleleft &&
    css`
      top: 0;
      bottom: 0;
      left: 0;
    `};
`;

const MenuDots = (props) => {
  return (
    <MenuStyledDots {...props}>
      <Popup
        style={{ zIndex: 2 }}
        on="click"
        position="top right"
        trigger={
          <IconWrap menu {...props} color="dark">
            <DotsVerticalRounded title="Menu" />
          </IconWrap>
        }
        flowing
      >
        {props.children}
      </Popup>
    </MenuStyledDots>
  );
};

export default MenuDots;
