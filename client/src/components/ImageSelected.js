import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { Cancel } from "@styled-icons/material/Cancel";
import { IconWrap } from "./styled/utils";

const ImageGalleryHover = styled.div`
  position: relative;
  overflow: hidden;
  margin: 2px;
  img {
    cursor: pointer;
    transition: transform 0.7s ease-in-out, filter 0.5s ease;
    object-fit: cover;
  }

  .overlayImg {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    height: 50px;
    width: 100%;
    top: 0;
    padding: 10px 15px;
    background: rgba(255, 255, 255, 0.7);
    z-index: 2;
    transform: translateY(-100%);
    transition: transform 0.4s linear;
  }

  &:hover {
    img {
      transform: scale(1.1);
      ${(props) =>
        props.grayscale &&
        css`
          filter: grayscale(100%);
        `};
    }
    .overlayImg {
      transform: translateY(0);
    }
  }
`;

const ImageSelected = ({
  photo,
  index,
  menu,
  grayscale,
  setCurrentImage,
  setViewerIsOpen,
}) => {
  // Open Light box
  const openLightbox = () => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  return (
    <ImageGalleryHover key={photo.id} grayscale={grayscale}>
      <img alt={photo.alt} {...photo} onClick={openLightbox} />
      {menu ? (
        <div className="overlayImg">
          <IconWrap medium title={"Cancel Update"} color="bluer">
            <Edit onClick={() => alert(photo.id)} />
          </IconWrap>
          <IconWrap medium title={"Cancel Update"} color="secondary">
            <Cancel onClick={() => alert(photo.alt)} />
          </IconWrap>
        </div>
      ) : (
        ""
      )}
    </ImageGalleryHover>
  );
};

export default ImageSelected;
