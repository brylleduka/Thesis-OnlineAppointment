import React from "react";
import gql from "graphql-tag";
import { FETCH_SERVICES_QUERY } from "../../../util/graphql/service";
import { useMutation } from "@apollo/react-hooks";

import { Modal, Header, Grid, Popup } from "semantic-ui-react";
import { DButton, IconWrap } from "../../styled/utils";
import { Content } from "../../styled/containers";
import { DeleteForever } from "@styled-icons/material";
import { Check } from "@styled-icons/entypo";
import { Cancel } from "@styled-icons/typicons";
import { Warning } from "@styled-icons/material-rounded";
import Spinner from "../../Spinner";

const ServiceConfirmDelete = ({
  open,
  setOpen,
  service,
  serviceHistoryCallback,
}) => {
  const [archiveService, { loading: loadArchiveService }] = useMutation(
    ARCHIVE_SERVICE,
    {
      variables: { serviceId: service._id, active: false },
      refetchQueries: [
        {
          query: FETCH_SERVICES_QUERY,
          variables: { categoryId: service.category._id, active: true },
        },
      ],
      onCompleted(data) {
        serviceHistoryCallback();
      },
    }
  );

  const [deleteService] = useMutation(DELETE_SERVICE_MUTATION, {
    update(cache) {
      const data = cache.readQuery({
        query: FETCH_SERVICES_QUERY,
        variables: {
          categoryId: service.category._id,
          active: true,
        },
      });

      data.services = data.services.filter((serv) => serv._id !== service._id);

      cache.writeQuery({
        query: FETCH_SERVICES_QUERY,
        variables: {
          categoryId: service.category._id,
          active: true,
        },
        data: { services: [...data.services] },
      });
    },
    onCompleted(data) {
      serviceHistoryCallback();
    },
    variables: {
      serviceId: service._id,
    },
  });

  const handleDeleteService = () => {
    deleteService();
  };

  return (
    <Modal
      basic
      size="small"
      open={open}
      onClose={() => setOpen(false)}
      closeIcon
    >
      <Header icon="archive" content={`Archive service: ${service.name}`} />
      <Modal.Content>
        <p>
          All containing details about this service will be remove. Are you sure
          you want to continue?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Content
          width="100%"
          height="100%"
          flex
          justify="space-between"
          align="center"
        >
          <Content
            flex
            width="100%"
            height="100%"
            justify="flex-start"
            align="center"
          >
            <Popup
              on="click"
              trigger={
                <DButton alert flex>
                  <DeleteForever size="22px" />
                  Delete Permanently
                </DButton>
              }
              position="top center"
              flowing
            >
              <Grid divided columns={2}>
                <Grid.Column>
                  <IconWrap size="22px" color="green" margin="0 auto">
                    <Check
                      title="Confirm deleting permanently"
                      onClick={handleDeleteService}
                    />
                  </IconWrap>
                </Grid.Column>
                <Grid.Column>
                  <IconWrap size="22px" color="red" margin="0 auto">
                    <Cancel title="Cancel action" />
                  </IconWrap>
                </Grid.Column>
              </Grid>
            </Popup>

            <Popup
              trigger={
                <IconWrap
                  circle
                  shadow
                  color="yellow"
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
            />
          </Content>
          <Content
            width="100%"
            height="100%"
            flex
            justify="flex-end"
            align="center"
          >
            <DButton confirm onClick={() => archiveService()}>
              {loadArchiveService ? (
                <Spinner inverted small row content="Loading..." />
              ) : (
                <>
                  <Check size="22px" />
                  Yes
                </>
              )}
            </DButton>
          </Content>
        </Content>
      </Modal.Actions>
    </Modal>
  );
};

const ARCHIVE_SERVICE = gql`
  mutation archivedService($serviceId: ID!, $active: Boolean) {
    archivedService(_id: $serviceId, active: $active) {
      _id
      name
      duration
      price
      description
      photo
      active
    }
  }
`;

const DELETE_SERVICE_MUTATION = gql`
  mutation deleteService($serviceId: ID!) {
    deleteService(_id: $serviceId)
  }
`;

export default ServiceConfirmDelete;
