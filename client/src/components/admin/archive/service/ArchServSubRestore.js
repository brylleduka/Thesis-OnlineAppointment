import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_ALL_SERVICES_QUERY } from "../../../../util/graphql/service";
import { Popup } from "semantic-ui-react";
import { DButton, IconWrap, DLabel } from "../../../styled/utils";
import { DGrid, Content } from "../../../styled/containers";
import Spinner from "../../../Spinner";
import { Restore } from "@styled-icons/material";

import { Check } from "@styled-icons/entypo";
import { Cancel } from "@styled-icons/typicons";

const ArchServSubRestore = ({ serviceId }) => {
  const [popServRestore, setPopServRestore] = useState(false);

  const [archiveServSub, { loading: loadServSub }] = useMutation(
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
    }
  );

  const confirmServSubRestore = (e) => {
    e.preventDefault();
    archiveServSub();
  };

  const handleServSubRestoreConfirm = () => {
    setPopServRestore(true);
  };

  return (
    <Popup
      open={popServRestore}
      trigger={
        <DButton flex confirm flex onClick={handleServSubRestoreConfirm}>
          <Restore size="22px" />
        </DButton>
      }
      position="top right"
      flowing
    >
      <Content
        flex
        justify="center"
        align="center"
        width="100%"
        height="100%"
        direct="column"
      >
        <DLabel w="100%" size="14px" color="dark" weight={700}>
          Restore this file?
        </DLabel>
        <Content width="100%" height="100%">
          <DGrid two gap="5px">
            <IconWrap
              size="22px"
              color="green"
              margin="0 auto"
              onClick={confirmServSubRestore}
            >
              {loadServSub ? (
                <Spinner row small content="Loading..." />
              ) : (
                <>
                  <Check title="Confirm restoration of this file" />
                  Confirm
                </>
              )}
            </IconWrap>

            <IconWrap
              size="22px"
              color="red"
              margin="0 auto"
              onClick={() => setPopServRestore(false)}
            >
              <Cancel title="Cancel action" />
              Cancel
            </IconWrap>
          </DGrid>
        </Content>
      </Content>
    </Popup>
  );
};

const RESTORE_SERVICE_SUB = gql`
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

export default ArchServSubRestore;
