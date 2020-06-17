import React, { useState, useCallback, useRef, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_GALLERY } from "../../util/graphql/gallery";
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
import Spinner from "../../components/Spinner";
import { scrollView } from "../../util/useScrollDown";
import useWindowSize from "../../util/hooks/useWindowSize";
import ImageSelected from "../../components/ImageSelected";

const Album = (props) => {
  const albumId = props.match.params._id;
  const content = useRef();
  const scrolling = useScroll(500);
  const { width: wid } = useWindowSize();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [albumPhotos, setAlbumPhotos] = useState([]);

  const { data: dataGallery, loading: loadGallery } = useQuery(FETCH_GALLERY, {
    variables: { id: albumId, active: true },
  });

  useEffect(() => {
    if (dataGallery) {
      setAlbumPhotos(dataGallery.gallery.photos);
    }
  }, [dataGallery]);

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

  return (
    <DContainer>
      {scrolling && <ScrollButton scrollPx="100" delay="16.66" />}
      <DSection
        background={
          "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
        height="65vh"
        fixed
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
          <h1 style={{ fontSize: "38px" }}>
            {dataGallery && dataGallery.gallery.title} Photos
          </h1>
          <MouseScroll onClick={scrollDown} />
        </Content>
        <Overlay />
      </DSection>
      {loadGallery ? (
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
          <DSection
            height="100%"
            style={{ minHeight: "100vh" }}
            width="90%"
            mcenter
            pad="20px 0"
            ref={content}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                marginBottom: "24px",
              }}
            >
              <MyGallery
                photos={albumPhotos.map((photo) => ({
                  height: photo.height,
                  width: photo.width,
                  src: photo.imageURL,
                  alt: photo.src,
                  id: photo._id,
                  key: photo._id,
                }))}
                renderImage={imageRenderer}
                columns={wid >= 500 ? 2 : wid >= 900 ? 3 : wid >= 1500 ? 4 : 2}
                directions="column"
              />
              <ModalGateway>
                {viewerIsOpen ? (
                  <Modal
                    onClose={closeLightbox}
                    styles={{
                      blanket: (base) => ({
                        ...base,
                        backgroundColor: "rgba(0,0,0,0.9)",
                      }),
                      positioner: (base) => ({
                        ...base,
                        display: "block",
                      }),
                    }}
                  >
                    <Carousel
                      styles={customStyles}
                      currentIndex={currentImage}
                      views={albumPhotos.map((photo) => ({
                        ...photo,
                        src: photo.imageURL,
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
            </div>
          </DSection>
        </>
      )}
    </DContainer>
  );
};

const customStyles = {
  footer: (base) => ({
    ...base,
    backgroundColor: "rgba(255,255,255,0.7)",
    fontWeight: 700,
    fontSize: "14px",
    padding: 20,
  }),
};

export default Album;
