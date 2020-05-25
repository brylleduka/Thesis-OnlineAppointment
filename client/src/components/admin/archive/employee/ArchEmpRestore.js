import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_EMPLOYEES_NOT_ADMIN_QUERY } from "../../../../util/graphql/employee";
import { Popup } from "semantic-ui-react";
import { DButton, IconWrap, DLabel } from "../../../styled/utils";
import { DGrid, Content } from "../../../styled/containers";
import Spinner from "../../../Spinner";
import { Restore } from "@styled-icons/material";

import { Check } from "@styled-icons/entypo";
import { Cancel } from "@styled-icons/typicons";

const ArchEmpRestore = ({ empId }) => {
  const [popRestore, setPopRestore] = useState(false);

  const [archiveEmployee, { loading: loadArchived }] = useMutation(
    RESTORE_EMPLOYEE,
    {
      variables: {
        employeeId: empId,
        active: true,
      },

      refetchQueries: [
        {
          query: FETCH_EMPLOYEES_NOT_ADMIN_QUERY,
          variables: { active: false, limit: 0 },
        },
      ],
    }
  );

  const confirmRestore = (e) => {
    e.preventDefault();
    archiveEmployee();
  };

  const handleRestoreConfirm = () => {
    setPopRestore(true);
  };

  return (
    <Popup
      open={popRestore}
      trigger={
        <DButton flex bgconfirm flex onClick={handleRestoreConfirm}>
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
        <DLabel w="100%" size="14px" weight={700}>
          Restore this file?
        </DLabel>
        <Content width="100%" height="100%">
          <DGrid two gap="5px">
            <IconWrap
              size="22px"
              color="green"
              margin="0 auto"
              onClick={confirmRestore}
            >
              {loadArchived ? (
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
              onClick={() => setPopRestore(false)}
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

const RESTORE_EMPLOYEE = gql`
  mutation archiveEmployee($employeeId: ID!, $active: Boolean) {
    archiveEmployee(_id: $employeeId, active: $active) {
      _id
      empId
      title
      firstName
      lastName
      contact
      email
      photo
      bio
      role
      level
      active
    }
  }
`;

export default ArchEmpRestore;
