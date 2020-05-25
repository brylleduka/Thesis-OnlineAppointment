import React, { useState } from "react";
import { Popup } from "semantic-ui-react";
import { DButton, IconWrap, DLabel } from "../../../styled/utils";
import { DGrid, Content } from "../../../styled/containers";
import { DeleteForever } from "@styled-icons/material";

import { Check } from "@styled-icons/entypo";
import { Cancel } from "@styled-icons/typicons";

const ArchEmpDelete = ({ empId }) => {
  const [popDelete, setPopDelete] = useState(false);

  const handleDeleteConfirm = () => {
    setPopDelete(true);
  };
  return (
    <Popup
      open={popDelete}
      trigger={
        <DButton bgalert flex onClick={handleDeleteConfirm}>
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
              onClick={() => alert(empId)}
            >
              <Check title="Confirm deleting permanently" />
              Confirm
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

export default ArchEmpDelete;
