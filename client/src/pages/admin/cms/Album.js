import React, { useState, useEffect, useCallback } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_GALLERY } from "../../../util/graphql/gallery";
import Layout from "../../../components/admin/layout/Layout";
import { DSection, Content } from "../../../components/styled/containers";
import { DButton, DInput } from "../../../components/styled/utils";
import { Breadcrumb, Modal } from "semantic-ui-react";
import MyGallery from "react-photo-gallery";
import Carousel, { Modal as ModalImage, ModalGateway } from "react-images";
import useWindowSize from "../../../util/hooks/useWindowSize";
import ImageSelected from "../../../components/admin/cms/gallery/ImageSelected";
import NewPhoto from "../../../components/admin/cms/gallery/NewPhoto";

const Album = (props) => {
  const albumId = props.match.params._id;
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [albumPhotos, setAlbumPhotos] = useState([]);
  const { width: wid } = useWindowSize();

  const { data: dataGallery, loading: loadGallery } = useQuery(FETCH_GALLERY, {
    variables: { id: albumId, active: true },
  });

  useEffect(() => {
    if (dataGallery) {
      setAlbumPhotos(dataGallery.gallery.photos);
    }
  }, [dataGallery]);

  const openLightbox = useCallback((event, index) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <ImageSelected
        albumPhotos={albumPhotos}
        openLightbox={openLightbox}
        key={key}
        index={index}
        photo={photo}
        left={left}
        top={top}
        menu={true}
      />
    ),
    []
  );

  const columns = (containerWidth) => {
    let columns = 2;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 3;
    if (containerWidth >= 1500) columns = 4;
    return columns;
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
            <Breadcrumb.Section>Gallery</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section active>Event Photos</Breadcrumb.Section>
          </Breadcrumb>
        </Content>
        <Content flex justify="flex-end" align="center" width="100%">
          <NewPhoto albumId={albumId} />
        </Content>
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
              src: `/images/gallery/${photo.src}`,
            }))}
            renderImage={imageRenderer}
            columns={columns}
            directions="column"
          />
          <ModalGateway>
            {viewerIsOpen ? (
              <ModalImage
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
                    src: `/images/gallery/${photo.src}`,
                    srcset: photo.srcSet,
                    caption:
                      photo.caption !== null
                        ? `${photo.name} - ${photo.caption}`
                        : photo.name,
                    alt: photo.name,
                  }))}
                />
              </ModalImage>
            ) : null}
          </ModalGateway>
        </div>
      </DSection>
    </Layout>
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
