import React, { useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_GALLERIES } from "../../../util/graphql/gallery";
import Layout from "../../../components/admin/layout/Layout";
import { DSection, Content } from "../../../components/styled/containers";
import { DButton } from "../../../components/styled/utils";
import { Breadcrumb } from "semantic-ui-react";
// import DRadio from "../../../components/DRadio";
import GalleryThumb from "../../../components/GalleryThumb";
import Spinner from "../../../components/Spinner";
import { Plus } from "@styled-icons/boxicons-regular/Plus";
import MyGallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

const photos = [
  {
    src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    width: 3,
    height: 2,
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
    width: 2,
    height: 3,
    alt: "Operation",
  },
  {
    src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
    width: 2,
    height: 3,
    alt: "Operation",
  },
  {
    src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
    width: 2,
    height: 3,
    alt: "Satisfied",
  },
  {
    src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
    width: 3,
    height: 2,
    alt: "Satisfied",
  },
  {
    src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
    width: 2,
    height: 3,
    alt: "Satisfied",
  },
  {
    src: "https://source.unsplash.com/PpOHJezOalU/800x599",
    width: 3,
    height: 2,
    alt: "Satisfied",
  },
  {
    src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
    width: 3,
    height: 2,
    alt: "Satisfied",
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
  } = useQuery(FETCH_GALLERIES, { active: true });

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
          <DButton flex>
            <Plus size="22px" />
            New album
          </DButton>
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
            {/* <GalleryThumb
              background={
                "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              }
              title="Event Photos"
              subtitle="50 Event Photos"
              link="/zeadmin/dashboard"
            /> */}

            {galleries.length > 0 ? (
              galleries.map((gallery) => (
                <GalleryThumb
                  background={
                    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  }
                  title="Event Photos"
                  subtitle="50 Event Photos"
                  link="/zeadmin/dashboard"
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
