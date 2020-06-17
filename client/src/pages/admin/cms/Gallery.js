import React, { useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_GALLERIES } from "../../../util/graphql/gallery";
import Layout from "../../../components/admin/layout/Layout";
import { DSection, Content } from "../../../components/styled/containers";
import { Breadcrumb } from "semantic-ui-react";
import MyGallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import GalleryThumb from "../../../components/GalleryThumb";
import Spinner from "../../../components/Spinner";
import NewAlbum from "../../../components/admin/cms/gallery/NewAlbum";
import ImageSelected from "../../../components/ImageSelected";

const Gallery = () => {
  let allPhotos = [];
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
      setGalleries(dataGalleries.galleries);
    }
  }, [dataGalleries]);

  console.log(galleries.map((gl) => gl));

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <ImageSelected
        key={key}
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

  const columns = (containerWidth) => {
    let columns = 2;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 4;
    return columns;
  };

  if (galleries) {
    galleries.map((g) => allPhotos.push(...g.photos));
  }

  return (
    <Layout>
      <DSection
        height="100%"
        width="90%"
        mcenter
        flex
        align="center"
        direct="column"
        minh="90vh"
      >
        <Content
          flex
          justify="space-between"
          align="center"
          width="100%"
          margin="24px auto"
          bgcolor="#eee"
          rounded
          pad="10px"
          height="5em"
        >
          <Breadcrumb size="big">
            <Breadcrumb.Section>Content Management</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section active>Gallery</Breadcrumb.Section>
          </Breadcrumb>
          <NewAlbum />
        </Content>

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
            width="100%"
            flex
            align="center"
            margin="0 auto"
            flow="row wrap"
          >
            {galleries.length > 0 ? (
              galleries.map((gallery) => (
                <GalleryThumb
                  key={gallery._id}
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
                  link={`/zeadmin/album/${gallery._id}`}
                />
              ))
            ) : (
              <h3
                style={{
                  height: "50vh",
                  width: "100%",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Add new album
              </h3>
            )}
          </Content>
        )}

        <div style={{ width: "100%", marginBottom: "36px" }}>
          <h3>All Photos</h3>

          <MyGallery
            photos={allPhotos.map((photo) => ({
              height: photo.height,
              width: photo.width,
              src: photo.imageURL,
              alt: photo.src,
              id: photo._id,
              key: photo._id,
            }))}
            renderImage={imageRenderer}
            columns={columns}
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
    </Layout>
  );
};

export default Gallery;
