import React, { useState, useEffect, useCallback } from "react";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  FETCH_ALL_SERVICES_QUERY,
  FETCH_SINGLE_SERVICE_QUERY
} from "../../util/graphql/service";

import Layout from "../../components/admin/layout/Layout";
import Skeleton from "../../components/Skeleton";
import {
  DGrid,
  DSection,
  Content,
  Overlay
} from "../../components/styled/containers";
import Spinner from "../../components/Spinner";
import ServiceDetails from "../../components/admin/services/ServiceDetails";

const Service = props => {
  const serviceId = props.match.params._id;
  const [service, setService] = useState([]);

  const { data: serviceData, loading: serviceLoading, error } = useQuery(
    FETCH_SINGLE_SERVICE_QUERY,
    {
      variables: {
        serviceId
      }
    }
  );
  useEffect(() => {
    if (serviceData) {
      setService(serviceData.service);
    }
  }, []);

  // DROPZONE
  const [addServicePhoto, { loading }] = useMutation(UPLOAD_SERVICE_PHOTO, {
    refetchQueries: [{ query: FETCH_ALL_SERVICES_QUERY }]
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

  return (
    <Layout>
      {serviceLoading ? (
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
      )}
    </Layout>
  );
};

const UPLOAD_SERVICE_PHOTO = gql`
  mutation addServicePhoto($serviceId: ID!, $file: Upload) {
    addServicePhoto(_id: $serviceId, file: $file)
  }
`;

export default Service;
