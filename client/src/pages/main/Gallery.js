import React, { useState, useCallback, useRef, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_GALLERIES } from "../../util/graphql/gallery";
import MyGallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import {
  DContainer,
  DSection,
  Content,
  Overlay,
} from "../../components/styled/containers";
import ScrollButton from "../../components/main/utils/ScrollButton";
import useScroll from "../../util/hooks/useScroll";
import MouseScroll from "../../components/MouseScroll";
import GalleryThumb from "../../components/GalleryThumb";
import Spinner from "../../components/Spinner";
import { scrollView } from "../../util/useScrollDown";
import useWindowSize from "../../util/hooks/useWindowSize";

const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 4,
    height: 3,
    alt: "Facility",
  },
  {
    src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    width: 1,
    height: 1,
    alt: "Facility",
  },
  {
    src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
    width: 3,
    height: 4,
    alt: "Operation",
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 3,
    height: 4,
    alt: "Operation",
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 3,
    height: 4,
    alt: "Satisfied",
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 4,
    height: 3,
    alt: "Satisfied",
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 3,
    height: 4,
    alt: "Satisfied",
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 4,
    height: 3,
    alt: "Satisfied",
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 4,
    height: 3,
    alt: "Satisfied",
  },
];

const Gallery = () => {
  const content = useRef();
  const scrolling = useScroll(500);
  const { width: wid } = useWindowSize();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [galleries, setGalleries] = useState([]);

  const {
    data: dataGalleries,
    loading: loadGalleries,
    error,
  } = useQuery(FETCH_GALLERIES, { variables: { active: true } });

  useEffect(() => {
    if (dataGalleries) {
      setGalleries(dataGalleries);
    }
  }, [dataGalleries]);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const scrollDown = () => {
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
          <MouseScroll onClick={scrollDown} />
        </Content>
        <Overlay />
      </DSection>
      {loadGalleries ? (
        <Content
          flex
          justify="center"
          align="center"
          minh="50vh"
          width="100%"
          margin="0 auto"
        >
          <Spinner content="Please wait while we fetch data..." medium />
        </Content>
      ) : (
        <Content
          height="auto"
          width="90%"
          flex
          justify={wid < 768 && "center"}
          align="center"
          margin="24px auto"
          flow="row wrap"
        >
          <GalleryThumb
            background={
              "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            }
            title="Event Photos"
            subtitle="50 Event Photos"
            link="/zeadmin/dashboard"
            margin={wid > 768 && "1rem"}
            size="large"
          />
          <GalleryThumb
            background={
              "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            }
            title="Event Photos"
            subtitle="50 Event Photos"
            link="/zeadmin/dashboard"
            margin={wid > 768 && "1rem"}
            size="large"
          />

          {galleries.length > 0 &&
            galleries.map((gallery) => (
              <GalleryThumb
                background={
                  "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                }
                title="Event Photos"
                subtitle="50 Event Photos"
                link="/zeadmin/dashboard"
              />
            ))}
        </Content>
      )}
      <DSection
        height="100%"
        style={{ minHeight: "100vh" }}
        width="90%"
        mcenter
        pad="20px 0"
        ref={content}
      >
        <h3>All Photos</h3>
        <MyGallery photos={photos} onClick={openLightbox} />
        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map((x) => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title,
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
