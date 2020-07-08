import React, { useState, useEffect, useCallback, useContext } from "react";
import { AuthContext } from "../../context/auth";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Camera } from "@styled-icons/boxicons-solid/Camera";
import toaster from "toasted-notes";
import {
  FETCH_ALL_SERVICES_QUERY,
  FETCH_SINGLE_SERVICE_QUERY,
} from "../../util/graphql/service";
import useWindowSize from "../../util/hooks/useWindowSize";
import ServiceDetails from "../../components/admin/services/ServiceDetails";
import Layout from "../../components/admin/layout/Layout";
import { IconWrap } from "../../components/styled/utils";
import Spinner from "../../components/Spinner";
import Carousel, { Modal, ModalGateway } from "react-images";
import Toasted from "../../components/Toasted";
import {
  DGrid,
  DSection,
  Content,
  DCard,
  DImage,
} from "../../components/styled/containers";

const Service = (props) => {
  const serviceId = props.match.params._id;
  const { employeeAuth } = useContext(AuthContext);
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
  const [addServicePhoto, { loading, data: dataServImg }] = useMutation(
    UPLOAD_SERVICE_PHOTO,
    {
      refetchQueries: [
        { query: FETCH_SINGLE_SERVICE_QUERY, variables: { serviceId } },
      ],
      onCompleted() {
        toaster.notify(({ onClose }) => (
          <Toasted success onClick={onClose}>
            Image Uploaded
          </Toasted>
        ));
      },
    }
  );

  const onDrop = useCallback(
    ([file]) => {
      if (file) {
        addServicePhoto({ variables: { serviceId, file } });
      }
    },
    [addServicePhoto]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const serviceHistoryCallback = () => {
    const pus = props.history.replace(
      `/zeadmin/category/${serviceData.service.category._id}`
    );
  };

  const images = [
    {
      src: dataServImg
        ? dataServImg.addServicePhoto.Location
        : service.imageURL !== null
        ? service.imageURL
        : "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/smiling-woman-with-touching-her-cheek-3762185.jpg",
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
              bgcolor="#eee"
              rounded
              pad="3px 10px"
              height="5em"
            >
              <Breadcrumb size="big">
                <Breadcrumb.Section as={Link} to="/zeadmin/categories">
                  Service Category
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right chevron" />
                <Breadcrumb.Section
                  as={Link}
                  to={`/zeadmin/category/${
                    service.category && service.category._id
                  }`}
                >
                  {service.category && service.category.name}
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right arrow" />
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
                  >
                    {loading ? (
                      <Spinner content="Uploading..." medium />
                    ) : (
                      <DImage height="100%" width="100%">
                        <img
                          src={
                            dataServImg
                              ? dataServImg.addServicePhoto.Location
                              : service.imageURL !== null
                              ? service.imageURL
                              : "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/smiling-woman-with-touching-her-cheek-3762185.jpg"
                          }
                          alt={service.name}
                          onClick={openLightbox}
                        />
                      </DImage>
                    )}
                    {(employeeAuth.role === "ADMIN" ||
                      employeeAuth.level >= 3) && (
                      <IconWrap
                        {...getRootProps()}
                        circle
                        bottomcenter
                        small
                        bgcolor={({ theme }) => theme.bluer}
                        pad="2px"
                      >
                        <Camera title="Upload" />
                        <input {...getInputProps()} />
                      </IconWrap>
                    )}
                  </DCard>

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
                    <DCard dw="100%" dh="100%" p="10px 20px" overf>
                      <ServiceDetails
                        service={serviceData.service}
                        serviceHistoryCallback={serviceHistoryCallback}
                        employeeAuthRole={employeeAuth.role}
                        employeeAuthLvl={employeeAuth.level}
                      />
                    </DCard>
                  </DGrid>
                </Content>
              </DGrid>
            </Content>
          </>
        )}
      </DSection>
    </Layout>
  );
};

const UPLOAD_SERVICE_PHOTO = gql`
  mutation addServicePhoto($serviceId: ID!, $file: Upload) {
    addServicePhoto(_id: $serviceId, file: $file) {
      Location
    }
  }
`;

export default Service;
