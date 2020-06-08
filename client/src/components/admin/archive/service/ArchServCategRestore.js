import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../../util/graphql/service";
import { Popup } from "semantic-ui-react";
import { DButton, IconWrap, DLabel } from "../../../styled/utils";
import { DGrid, Content } from "../../../styled/containers";
import Spinner from "../../../Spinner";
import { Restore } from "@styled-icons/material";

import { Check } from "@styled-icons/entypo";
import { Cancel } from "@styled-icons/typicons";

const ArchServCategRestore = ({ categoryId }) => {
  const [popCategRestore, setPopCategRestore] = useState(false);

  const [archiveServCategory, { loading: loadServCategory }] = useMutation(
    RESTORE_SERVICE_CATEGORY,
    {
      variables: {
        categoryId,
        active: true,
      },

      refetchQueries: [
        {
          query: FETCH_ALL_CATEGORIES_QUERY,
          variables: { active: false },
        },
      ],
    }
  );

  const confirmServCategRestore = (e) => {
    e.preventDefault();
    archiveServCategory();
  };

  const handleServCategRestoreConfirm = () => {
    setPopCategRestore(true);
  };

  return (
    <Popup
      open={popCategRestore}
      trigger={
        <DButton flex confirm flex onClick={handleServCategRestoreConfirm}>
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
              onClick={confirmServCategRestore}
            >
              {loadServCategory ? (
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
              onClick={() => setPopCategRestore(false)}
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

const RESTORE_SERVICE_CATEGORY = gql`
  mutation archivedCategory($categoryId: ID!, $active: Boolean) {
    archivedCategory(_id: $categoryId, active: $active) {
      _id
      name
      description
      photo
    }
  }
`;

export default ArchServCategRestore;
