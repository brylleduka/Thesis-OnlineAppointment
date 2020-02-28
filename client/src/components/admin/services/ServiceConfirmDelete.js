import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { FETCH_SERVICES_QUERY } from "../../../util/graphql/service";
import { useMutation } from "@apollo/react-hooks";

import { Modal, Header } from "semantic-ui-react";
import { DButton, DButtonCancel } from "../../styled/utils";

const ServiceConfirmDelete = ({
  open,
  setOpen,
  service,
  serviceHistoryCallback
}) => {
  const [deleteService] = useMutation(DELETE_SERVICE_MUTATION, {
    update(cache) {
      const data = cache.readQuery({
        query: FETCH_SERVICES_QUERY,
        variables: {
          categoryId: service.category._id
        }
      });

      data.services = data.services.filter(serv => serv._id !== service._id);

      cache.writeQuery({
        query: FETCH_SERVICES_QUERY,
        variables: {
          categoryId: service.category._id
        },
        data: { services: [...data.services] }
      });
    },
    onCompleted(data) {
      serviceHistoryCallback();
    },
    variables: {
      serviceId: service._id
    }
  });

  const handleDeleteService = () => {
    deleteService();
  };

  return (
    <Modal basic size="small" open={open}>
      <Header
        icon="archive"
        content={`Delete this service: ${service.name}?`}
      />
      <Modal.Content>
        <p>
          All containing details about this service will be remove. Are you sure
          you want to continue?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <DButton basic onClick={() => setOpen(false)}>
          No
        </DButton>
        <DButtonCancel basic onClick={handleDeleteService}>
          Yes
        </DButtonCancel>
      </Modal.Actions>
    </Modal>
  );
};

const DELETE_SERVICE_MUTATION = gql`
  mutation deleteService($serviceId: ID!) {
    deleteService(_id: $serviceId)
  }
`;

export default ServiceConfirmDelete;
