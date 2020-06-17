import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { DGrid, Content, DCard, DImage } from "../../styled/containers";
import { DButton } from "../../styled/utils";
import Carousel, { Modal, ModalGateway } from "react-images";
import Spinner from "../../Spinner";

const PhotoBooth = ({ photo }) => {
  // LIGHT BOX
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const openLightbox = () => {
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setViewerIsOpen(false);
  };

  const images = [
    {
      src: photo
        ? photo
        : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];

  return (
    <Content width="100%" height="auto">
      <DGrid gap="15px">
        <DCard dh="auto" flex justifyBetween alignCenter fcol>
          <DImage circle height="150px" width="150px">
            <img
              src={
                photo !== null
                  ? photo
                  : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              }
              alt="Avatar"
              onClick={openLightbox}
            />
          </DImage>

          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel views={images} />
              </Modal>
            ) : null}
          </ModalGateway>
        </DCard>
      </DGrid>
    </Content>
  );
};

export default PhotoBooth;
