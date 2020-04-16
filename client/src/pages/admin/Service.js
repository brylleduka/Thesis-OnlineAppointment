import React, { useState, useEffect, useCallback } from "react";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  FETCH_ALL_SERVICES_QUERY,
  FETCH_SINGLE_SERVICE_QUERY,
} from "../../util/graphql/service";
import Layout from "../../components/admin/layout/Layout";
import { Breadcrumb } from "semantic-ui-react";
import {
  DGrid,
  DSection,
  Content,
  DCard,
  DImage,
  Overlay,
} from "../../components/styled/containers";
import ReadMore from "../../components/main/utils/ReadMore";
import Spinner from "../../components/Spinner";
import Carousel, { Modal, ModalGateway } from "react-images";
import DCamera from "../../components/DCamera";
import ServiceDetails from "../../components/admin/services/ServiceDetails";
import useWindowSize from "../../util/hooks/useWindowSize";
import toaster from "toasted-notes";
import Toasted from "../../components/Toasted";
import { Link } from "react-router-dom";

const Service = (props) => {
  const serviceId = props.match.params._id;
  const [service, setService] = useState({});
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const { width: wid } = useWindowSize();

  const { data: serviceData, loading: serviceLoading, error } = useQuery(
    FETCH_SINGLE_SERVICE_QUERY,
    {
      variables: {
        serviceId,
      },
    }
  );
  useEffect(() => {
    if (serviceData) {
      setService(serviceData.service);
    }
  }, [serviceData]);

  // LIGHT BOX
  const openLightbox = () => {
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setViewerIsOpen(false);
  };

  // DROPZONE
  const [addServicePhoto, { loading }] = useMutation(UPLOAD_SERVICE_PHOTO, {
    refetchQueries: [{ query: FETCH_ALL_SERVICES_QUERY }],
  });

  const onDrop = useCallback(
    ([file]) => {
      addServicePhoto({ variables: { serviceId, file } });
    },
    [addServicePhoto]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const serviceHistoryCallback = () => {
    const pus = props.history.replace(
      `/zeadmin/category/${serviceData.service.category._id}`
    );
  };

  const images = [
    {
      src: service.photo
        ? `/images/service/${service.photo}`
        : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    },
  ];

  return (
    <Layout>
      <DSection
        width="90%"
        height="100%"
        flex
        justify="space-around"
        align="center"
        direct="column"
        mcenter
      >
        {serviceLoading ? (
          <Spinner content="Please wait while we fetch our data..." />
        ) : (
          <>
            <Content
              flex
              justify="space-between"
              align="center"
              width="100%"
              margin="24px auto"
            >
              <Breadcrumb size={"huge"}>
                <Breadcrumb.Section link>Category</Breadcrumb.Section>
                <Breadcrumb.Divider>/</Breadcrumb.Divider>
                <Breadcrumb.Section active>{service.name}</Breadcrumb.Section>
              </Breadcrumb>
            </Content>
            <Content width="100%" height="100%" margin="24px auto">
              <DGrid
                custom="1fr 3fr"
                med10="2fr 4fr"
                med7="2fr 4fr"
                gap={wid < 768 ? "10px" : "20px"}
              >
                <Content
                  width="100%"
                  height="100%"
                  flex
                  justify="flex-start"
                  align="center"
                  mcenter
                  direct="column"
                >
                  <DCard
                    dw={wid < 524 ? "50%" : "100%"}
                    dh="250px"
                    mcenter
                    p="0px"
                    grayzoom
                    overlaying
                  >
                    {loading ? (
                      <Spinner content="Loading..." medium />
                    ) : (
                      <DImage height="100%" width="100%" grayscaling>
                        <img
                          src={
                            service.photo
                              ? `/images/service/${service.photo}`
                              : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                          }
                          alt={service.name}
                          onClick={openLightbox}
                        />
                      </DImage>
                    )}
                    <Overlay
                      bgc
                      width="100%"
                      height="100%"
                      flex
                      justify="center"
                      align="center"
                      initbox
                    >
                      <div className="overlay-box">
                        <div className="overlay-box__content dark">
                          <h3 className="title">{service.name}</h3>

                          <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Dolor voluptates inventore labore deserunt fa
                          </p>
                          <ReadMore center size="14px">
                            Learn More
                          </ReadMore>
                        </div>
                      </div>
                    </Overlay>
                  </DCard>
                  <DCamera {...getRootProps()} color="green" size="22px">
                    <input {...getInputProps()} />
                  </DCamera>
                  <ModalGateway>
                    {viewerIsOpen ? (
                      <Modal onClose={closeLightbox}>
                        <Carousel views={images} />
                      </Modal>
                    ) : null}
                  </ModalGateway>
                </Content>
                <Content width="100%" height="100%">
                  <DGrid gap="10px">
                    <DCard dw="100%" dh="100%" p="10px 20px">
                      <ServiceDetails
                        service={serviceData.service}
                        serviceHistoryCallback={serviceHistoryCallback}
                      />
                    </DCard>
                  </DGrid>
                </Content>
              </DGrid>
            </Content>
          </>
        )}
      </DSection>
      {/* {serviceLoading ? (
        <Skeleton />
      ) : (
        <DGrid style={{ margin: "20px 0" }}>
          <DSection
            style={{ borderBottom: "1px solid #ccc" }}
            height="100%"
            pad="0 0 20px 0"
          >
            <DGrid three>
              <Content
                height="100%"
                width="100%"
                flex
                justify="center"
                align="center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <>
                    <Content height="300px"></Content>
                    <Overlay
                      flex
                      justify="center"
                      align="center"
                      bg="rgba(0, 0, 0, 0.6)"
                      className="dark"
                    >
                      <h3>Drop Image</h3>
                    </Overlay>
                  </>
                ) : (
                  <>
                    {loading ? (
                      <Spinner medium inverted />
                    ) : (
                      <img
                        src={
                          serviceData.service.photo !== null
                            ? `/images/service/${serviceData.service.photo}`
                            : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                        }
                        alt="Category"
                        width="100%"
                        height="400px"
                        style={{ objectFit: "contain" }}
                      />
                    )}

                    <Overlay
                      opac="0"
                      hovOpac="1"
                      pointer
                      className="dark"
                      flex
                      justify="center"
                      align="center"
                      bg="rgba(0, 0, 0, 0.6)"
                    >
                      <h4>Click or Drop an Image to upload</h4>
                    </Overlay>
                  </>
                )}
              </Content>
              <Content></Content>
            </DGrid>
          </DSection>

          <ServiceDetails
            service={serviceData.service}
            serviceHistoryCallback={serviceHistoryCallback}
          />
        </DGrid>
      )} */}
    </Layout>
  );
};

const UPLOAD_SERVICE_PHOTO = gql`
  mutation addServicePhoto($serviceId: ID!, $file: Upload) {
    addServicePhoto(_id: $serviceId, file: $file)
  }
`;

export default Service;
