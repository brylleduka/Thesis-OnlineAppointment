import React from "react";
import styled, { css } from "styled-components";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { Cancel } from "@styled-icons/material/Cancel";
import { IconWrap } from "../../../styled/utils";

const ImageGalleryHover = styled.div`
  position: relative;
  overflow: hidden;

  img {
    cursor: pointer;
    transition: transform 0.7s ease-in-out;
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
    }
    .overlayImg {
      transform: translateY(0);
    }
  }
`;

const ImageSelected = ({
  photo,

  openLightbox,
  menu,
}) => {
  return (
    <ImageGalleryHover>
      <img alt={photo.name} {...photo} onClick={openLightbox} />
      {menu ? (
        <div className="overlayImg">
          <IconWrap medium title={"Cancel Update"} color="bluer">
            <Edit />
          </IconWrap>
          <IconWrap medium title={"Cancel Update"} color="secondary">
            <Cancel />
          </IconWrap>
        </div>
      ) : (
        ""
      )}
    </ImageGalleryHover>
  );
};

export default ImageSelected;
