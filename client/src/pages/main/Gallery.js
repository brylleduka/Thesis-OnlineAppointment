import React, { useState, useCallback, useRef } from "react";
import MyGallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import {
  DContainer,
  DSection,
  Content,
  Overlay
} from "../../components/styled/containers";
import { DButton, ScrollUp } from "../../components/styled/utils";
import ScrollButton from "../../components/main/utils/ScrollButton";
import useScroll from "../../util/hooks/useScroll";

const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3,
    alt: "Facility"
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1,
    alt: "Facility"
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4,
    alt: "Operation"
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 3,
    height: 4,
    alt: "Operation"
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 3,
    height: 4,
    alt: "Satisfied"
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 4,
    height: 3,
    alt: "Satisfied"
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 3,
    height: 4,
    alt: "Satisfied"
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 4,
    height: 3,
    alt: "Satisfied"
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3,
    alt: "Satisfied"
  }
];

const Gallery = () => {
  const content = useRef();
  const scrolling = useScroll(500);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  function scrollView(ref) {
    if (ref.current)
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
  }

  const pageDown = () => {
    scrollView(content);
  };

  return (
    <DContainer>
      {scrolling && <ScrollButton scrollPx="100" delay="16.66" />}
      <DSection
        background={
          "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
        height="85vh"
        fixed
        id="gallery"
      >
        <Content
          flex
          justify="center"
          direct="column"
          align="center"
          width="50%"
          margin="0 auto"
          height="100%"
          style={{ minWidth: "90%", textAlign: "center" }}
          className="dark"
        >
          <h1 style={{ fontSize: "38px" }}>Gallery</h1>
          <h3>Love Your Skin</h3>
          <DButton
            onClick={pageDown}
            basic
            circle
            default
            size="48px"
            width="48px"
            pad="auto"
            style={{
              position: "absolute",
              bottom: "20px"
            }}
          >
            <ScrollUp name="chevron down" size="large" circular />
          </DButton>
        </Content>
        <Overlay />
      </DSection>
      <DSection
        height="100%"
        style={{ minHeight: "100vh" }}
        width="80%"
        mcenter
        pad="20px 0"
        ref={content}
      >
        <MyGallery photos={photos} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </DSection>
    </DContainer>
  );
};

export default Gallery;
