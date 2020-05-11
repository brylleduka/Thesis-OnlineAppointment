import styled from "styled-components";

export const RadioStyle = styled.div`
  height: 36px;
  width: 100%;

  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);

  .radio {
    position: absolute;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    border: 0;
    overflow: hidden;
    &:checked {
      & + .radio-label {
        background-color: #2193b0;
        color: #fff;
        font-weight: 700;
        box-shadow: none;
      }
    }
  }

  .radio-label {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #e4e4e4;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    line-height: 1;
    text-align: center;

    padding: 8px 16px;

    transition: all 0.1s ease-in-out;
    &:hover {
      cursor: pointer;
    }
  }

  &:first-of-type {
    border-radius: 4px 0 0 4px;
  }
  &:last-of-type {
    border-radius: 0 4px 4px 0;
  }
`;
