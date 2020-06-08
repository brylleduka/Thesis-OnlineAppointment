import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  FETCH_SINGLE_SERVICE_QUERY,
  FETCH_ALL_SERVICES_QUERY,
} from "../../../../util/graphql/service";
import { DButton, IconWrap } from "../../../styled/utils";
import { DGrid, Content } from "../../../styled/containers";
import { JCard4, JCard3 } from "../../../styled/card";
import { Modal, Popup } from "semantic-ui-react";
import { DeleteForever, Restore, Warning } from "@styled-icons/material";

import { Check } from "@styled-icons/entypo";
import { Cancel } from "@styled-icons/typicons";
import parser from "html-react-parser";
import useWindowSize from "../../../../util/hooks/useWindowSize";

import toaster from "toasted-notes";
import Toasted from "../../../Toasted";
import Spinner from "../../../Spinner";

const ArchServSubView = ({ serviceId, serviceView, setServiceView }) => {
  const { width: wid } = useWindowSize();
  const [serv, setServ] = useState({});
  const [popWarnServ, setPopWarnServ] = useState(false);

  // QUERY CATEGORY
  const { data: serviceData, loading: serviceLoad } = useQuery(
    FETCH_SINGLE_SERVICE_QUERY,
    {
      variables: { serviceId },
    }
  );

  useEffect(() => {
    if (serviceData) setServ(serviceData.service);
  }, [serviceData]);

  // DELETE CATEGORY
  const [deleteService, { loading: loadServiceResult }] = useMutation(
    DELETE_SERVICE_PERM,
    {
      variables: {
        serviceId,
      },
      refetchQueries: [
        {
          query: FETCH_ALL_SERVICES_QUERY,
          variables: { active: false },
        },
      ],
      onCompleted() {
        setServiceView(false);
        toaster.notify(
          ({ onClose }) => (
            <Toasted success onClick={onClose}>
              Successfully Deleted
            </Toasted>
          ),
          { position: "bottom-right" }
        );
      },
    }
  );
  // END DELETE

  // RESTORE
  const [archiveServSub, { loading: loadArchServSub }] = useMutation(
    RESTORE_SERVICE_SUB,
    {
      variables: {
        serviceId,
        active: true,
      },

      refetchQueries: [
        {
          query: FETCH_ALL_SERVICES_QUERY,
          variables: { active: false },
        },
      ],

      update(cache) {
        const data = cache.readQuery({
          query: FETCH_ALL_SERVICES_QUERY,
          variables: { active: false },
        });

        cache.writeQuery({
          query: FETCH_ALL_SERVICES_QUERY,
          variables: { active: true },
          data: { services: [...data.services] },
        });
      },

      onCompleted() {
        setServiceView(false);
        toaster.notify(
          ({ onClose }) => (
            <Toasted success onClick={onClose}>
              Successfully Restored
            </Toasted>
          ),
          { position: "bottom-right" }
        );
      },
    }
  );
  // END RESTORE

  const handleWarning = () => {
    setPopWarnServ(!popWarnServ);
  };

  const handleDeleteServiceConfirm = (e) => {
    e.preventDefault();
    deleteService();
  };

  const confirmRestoreServ = (e) => {
    e.preventDefault();
    archiveServSub();
  };

  return (
    <>
      <Modal
        size={wid < 1024 ? "tiny" : "small"}
        open={serviceView}
        onClose={() => setServiceView(false)}
        closeIcon
      >
        {serviceLoad ? (
          <Spinner medium content="Please wait while we fetch data..." />
        ) : (
          <DGrid two>
            <Modal.Content>
              <JCard4
                top={"-30px"}
                imgh="250px"
                imgw={wid <= 768 ? "50%" : "75%"}
              >
                <div className="profile-image">
                  <img
                    src={
                      serv.photo
                        ? `/images/service/${serv.photo}`
                        : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample83.jpg"
                    }
                    alt={serv.photo}
                  />
                </div>
              </JCard4>
            </Modal.Content>
            <Modal.Content scrolling className="modal-content2">
              <JCard3>
                <div className="description">
                  <h1>{serv.name}</h1>

                  <p style={{ letterSpacing: "2px", lineHeight: 1.5 }}>
                    {serv.description
                      ? parser(serv.description)
                      : serv.description}
                  </p>
                </div>
              </JCard3>
            </Modal.Content>
          </DGrid>
        )}
        <Modal.Actions>
          <Content
            flex
            justify="space-between"
            align="center"
            width="100%"
            height="100%"
          >
            <Content
              flex
              width="100%"
              height="100%"
              justify="flex-start"
              align="center"
            >
              <Popup
                open={popWarnServ}
                trigger={
                  <DButton alert flex onClick={handleWarning}>
                    <DeleteForever size="22px" />
                    Delete Permanently
                  </DButton>
                }
                position="top center"
                flowing
              >
                <DGrid two gap="5px">
                  <IconWrap
                    size="22px"
                    color="green"
                    margin="0 auto"
                    onClick={handleDeleteServiceConfirm}
                  >
                    {loadServiceResult ? (
                      <Spinner small row content="Deleting..." />
                    ) : (
                      <>
                        <Check title="Confirm deleting permanently" />
                        Confirm
                      </>
                    )}
                  </IconWrap>

                  <IconWrap
                    size="22px"
                    color="red"
                    margin="0 auto"
                    onClick={() => setPopWarnServ(false)}
                  >
                    <Cancel title="Cancel action" />
                    Cancel
                  </IconWrap>
                </DGrid>
              </Popup>

              <Popup
                trigger={
                  <IconWrap
                    circle
                    color="secondary"
                    small
                    mcenter
                    title="Warning"
                  >
                    <Warning />
                  </IconWrap>
                }
                content={
                  <p style={{ fontWeight: 700 }}>
                    Deleting Permantly cannot be restored
                  </p>
                }
                position="top right"
                size="tiny"
                inverted
              />
            </Content>

            <Content
              width="100%"
              height="100%"
              flex
              justify="flex-end"
              align="center"
            >
              <DButton confirm onClick={confirmRestoreServ}>
                {loadArchServSub ? (
                  <Spinner row small inverted content="Restoring..." />
                ) : (
                  <>
                    <Restore size="22px" />
                    Restore
                  </>
                )}
              </DButton>
            </Content>
          </Content>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const DELETE_SERVICE_PERM = gql`
  mutation deleteService($serviceId: ID!) {
    deleteService(_id: $serviceId)
  }
`;

const RESTORE_SERVICE_SUB = gql`
  mutation archivedService($serviceId: ID!, $active: Boolean) {
    archivedService(_id: $serviceId, active: $active)
  }
`;

export default ArchServSubView;
