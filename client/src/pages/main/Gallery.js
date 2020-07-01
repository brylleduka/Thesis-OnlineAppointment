import React, { useState, useCallback, useRef, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_GALLERIES } from "../../util/graphql/gallery";
import { FETCH_THE_SHOWCASE } from "../../util/graphql/cms";
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
import ImageSelected from "../../components/ImageSelected";

const Gallery = () => {
  let allPhotos = [];
  const content = useRef();
  const scrolling = useScroll(500);
  const { width: wid } = useWindowSize();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [galleries, setGalleries] = useState([]);
  const [isShowcase, setIsShowcase] = useState([]);

  const {
    data: dataGalleries,
    loading: loadGalleries,
    error,
  } = useQuery(FETCH_GALLERIES, { variables: { active: true } });

  const { data: dataShowcase, loading: loadShowcase } = useQuery(
    FETCH_THE_SHOWCASE,
    {
      variables: {
        sectionName: "SHOWCASE",
      },
    }
  );

  useEffect(() => {
    if (dataGalleries) {
      setGalleries(dataGalleries.galleries);
    }

    if (dataShowcase) {
      setIsShowcase(dataShowcase.showcaseCMS.content);
    }
  }, [dataGalleries, dataShowcase]);

  const imageRenderer = useCallback(
    ({ index, left, top, photo }) => (
      <ImageSelected
        index={index}
        photo={photo}
        left={left}
        top={top}
        setCurrentImage={setCurrentImage}
        setViewerIsOpen={setViewerIsOpen}
      />
    ),
    []
  );

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const scrollDown = () => {
    scrollView(content);
  };

  if (galleries) {
    galleries.map((g) => allPhotos.push(...g.photos));
  }

  return (
    <DContainer>
      {scrolling && <ScrollButton scrollPx="100" delay="16.66" />}
      <DSection
        background={
          isShowcase[1] !== undefined
            ? isShowcase[1].bgImgURL
            : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
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
          <h1
            style={{
              fontSize: "38px",
              letterSpacing: "1rem",
              textTransform: "uppercase",
            }}
          >
            Gallery
          </h1>
          <p
            style={{
              fontSize: "18px",
              textAlign: "center",
              letterSpacing: "0.75rem",
            }}
          >
            Be your own kind of Beautiful
          </p>
          <MouseScroll onClick={scrollDown} inverted />
        </Content>
        <Overlay bgc />
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
          <Spinner content="Please wait while we fetch data..." />
        </Content>
      ) : (
        <>
          <Content
            height="auto"
            width="90%"
            flex
            justify={wid < 768 && "center"}
            align="center"
            margin="24px auto"
            flow="row wrap"
          >
            {galleries.length > 0 &&
              galleries.map((gallery) => (
                <GalleryThumb
                  background={
                    gallery.photos.length > 0
                      ? gallery.photos[0].imageURL
                      : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  }
                  title={`${gallery.title} Photos`}
                  subtitle={`${gallery.photos.length}${
                    gallery.photos.length > 20 ? "+" : ""
                  } ${gallery.title} Photo${
                    gallery.photos.length > 1 ? "s" : ""
                  }`}
                  link={`/album/${gallery._id}`}
                />
              ))}
          </Content>
          <DSection
            height="100%"
            style={{ minHeight: "100vh" }}
            width="90%"
            mcenter
            pad="20px 0"
            ref={content}
          >
            <h3>All Photos</h3>

            <MyGallery
              photos={allPhotos.map((photo) => ({
                height: photo.height,
                width: photo.width,
                src: photo.imageURL,
                alt: photo.alt,
                id: photo._id,
              }))}
              renderImage={imageRenderer}
              directions="column"
            />
            <ModalGateway>
              {viewerIsOpen ? (
                <Modal onClose={closeLightbox}>
                  <Carousel
                    currentIndex={currentImage}
                    views={allPhotos.map((photo) => ({
                      ...photo,
                      src: photo.imageURL,
                      srcset: photo.srcSet,
                      caption:
                        photo.caption !== null
                          ? `${photo.name} - ${photo.caption}`
                          : photo.name,
                      alt: photo.src,
                    }))}
                  />
                </Modal>
              ) : null}
            </ModalGateway>
          </DSection>
        </>
      )}
    </DContainer>
  );
};

export default Gallery;
