import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../../util/graphql/service";

import { Popup } from "semantic-ui-react";
import { DButton, IconWrap, DLabel } from "../../../styled/utils";
import { DGrid, Content } from "../../../styled/containers";
import { DeleteForever } from "@styled-icons/material";

import { Check } from "@styled-icons/entypo";
import { Cancel } from "@styled-icons/typicons";
import toaster from "toasted-notes";
import Toasted from "../../../Toasted";
import Spinner from "../../../Spinner";

const ArchServCategDelete = ({ categoryId }) => {
  const [popCategDelete, setPopCategDelete] = useState(false);

  const [deleteServCateg, { loading: loadServCateg }] = useMutation(
    DELETE_SERVICE_CATEGORY,
    {
      variables: {
        categoryId,
      },
      refetchQueries: [
        {
          query: FETCH_ALL_CATEGORIES_QUERY,
          variables: { active: false },
        },
      ],
      onCompleted(res) {
        setPopCategDelete(false);
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

  const handleServCategDeleteNotif = () => {
    setPopCategDelete(true);
  };

  const handleServCategDeleteConfirm = (e) => {
    e.preventDefault();
    deleteServCateg();
  };

  return (
    <Popup
      open={popCategDelete}
      trigger={
        <DButton alert flex onClick={handleServCategDeleteNotif}>
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
        <DLabel w="100%" color="dark" size="14px" weight={700}>
          Delete Confirm?
        </DLabel>
        <Content width="100%" height="100%">
          <DGrid two gap="5px">
            <IconWrap
              size="22px"
              color="green"
              margin="0 auto"
              onClick={handleServCategDeleteConfirm}
            >
              {loadServCateg ? (
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
              onClick={() => setPopCategDelete(false)}
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

const DELETE_SERVICE_CATEGORY = gql`
  mutation deleteCategory($categoryId: ID!) {
    deleteCategory(_id: $categoryId)
  }
`;

export default ArchServCategDelete;
