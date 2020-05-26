import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_EMPLOYEES_NOT_ADMIN_QUERY } from "../../../../util/graphql/employee";

import { Popup } from "semantic-ui-react";
import { DButton, IconWrap, DLabel } from "../../../styled/utils";
import { DGrid, Content } from "../../../styled/containers";
import { DeleteForever } from "@styled-icons/material";

import { Check } from "@styled-icons/entypo";
import { Cancel } from "@styled-icons/typicons";
import toaster from "toasted-notes";
import Toasted from "../../../Toasted";
import Spinner from "../../../Spinner";

const ArchEmpDelete = ({ empId }) => {
  const [popDelete, setPopDelete] = useState(false);

  const [deleteEmployee, { loading: loadResult }] = useMutation(
    DELETE_EMP_PERM,
    {
      variables: {
        empId,
      },
      refetchQueries: [
        {
          query: FETCH_EMPLOYEES_NOT_ADMIN_QUERY,
          variables: { limit: 0, active: false },
        },
      ],
      onCompleted(res) {
        setPopDelete(false);
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

  const handleDeleteNotif = () => {
    setPopDelete(true);
  };

  const handleDeleteConfirm = (e) => {
    e.preventDefault();
    deleteEmployee();
  };

  return (
    <Popup
      open={popDelete}
      trigger={
        <DButton bgalert flex onClick={handleDeleteNotif}>
          <DeleteForever size="22px" />
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
          Delete Confirm?
        </DLabel>
        <Content width="100%" height="100%">
          <DGrid two gap="5px">
            <IconWrap
              size="22px"
              color="green"
              margin="0 auto"
              onClick={handleDeleteConfirm}
            >
              {loadResult ? (
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
              onClick={() => setPopDelete(false)}
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

const DELETE_EMP_PERM = gql`
  mutation deleteEmployee($empId: ID!) {
    deleteEmployee(_id: $empId)
  }
`;

export default ArchEmpDelete;
