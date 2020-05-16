import React, { useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_GALLERIES } from "../../../util/graphql/gallery";
import Layout from "../../../components/admin/layout/Layout";
import { DSection, Content } from "../../../components/styled/containers";
import { Breadcrumb } from "semantic-ui-react";
// import DRadio from "../../../components/DRadio";
import MyGallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import GalleryThumb from "../../../components/GalleryThumb";
import Spinner from "../../../components/Spinner";
import NewAlbum from "../../../components/admin/cms/gallery/NewAlbum";

const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 3,
    height: 2,
    alt: "Facility",
  },
];

const Gallery = () => {
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

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

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
            justify="space-between"
            align="center"
            margin="0 auto"
            flow="row wrap"
          >
            {galleries.length > 0 ? (
              galleries.map((gallery) => (
                <GalleryThumb
                  key={gallery._id}
                  background={`/images/gallery/${gallery.photos[0].src}`}
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

        {/* <DRadio.RadioGroup>
            <DRadio.RadioInput
              value="all"
              label="All"
              id="radion-one"
              name="switch-one"
              checked={isRadioCheck === "all" ? true : false}
              onChange={handleRadioGallery}
            />
            <DRadio.RadioInput
              value="facility"
              label="Facility"
              id="radion-two"
              name="switch-one"
              checked={isRadioCheck === "facility" ? true : false}
              onChange={handleRadioGallery}
            />
            <DRadio.RadioInput
              value="event"
              label="Event"
              id="radion-three"
              name="switch-one"
              checked={isRadioCheck === "event" ? true : false}
              onChange={handleRadioGallery}
            />
          </DRadio.RadioGroup> */}

        <div style={{ width: "100%", marginBottom: "36px" }}>
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
        </div>
      </DSection>
    </Layout>
  );
};

export default Gallery;
