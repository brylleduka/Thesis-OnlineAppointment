import React, { useState } from "react";
import { Content } from "../../styled/containers";
import { DButton, IconWrap } from "../../styled/utils";
import Spinner from "../../Spinner";
import { Delete } from "@styled-icons/material/Delete";
import { Question } from "@styled-icons/remix-fill/Question";
import { Popup, Modal } from "semantic-ui-react";

const EmployeeDelete = ({ employee }) => {
  const [isDlt, setIsDlt] = useState(false);

  return (
    <>
      <Content flex width="100%" justify="flex-end" align="center">
        <DButton flex alert onClick={() => setIsDlt(true)}>
          <IconWrap small mcenter title="Delete Employee Info">
            <Delete />
          </IconWrap>
          Delete
        </DButton>
        <Popup
          trigger={
            <IconWrap circle shadow color="primary" tiny mcenter title="Info">
              <Question />
            </IconWrap>
          }
          content="Store in archive or permanently delete this employee information."
          inverted
          position="top right"
          size="tiny"
        />
      </Content>
      <Modal open={isDlt} onClose={() => setIsDlt(false)} closeIcons>
        <Modal.Header></Modal.Header>
        <Modal.Content>{employee._id}</Modal.Content>
        <Modal.Actions>
          <DButton basic alert red>
            No
          </DButton>
          <DButton basic confirm green>
            Yes
          </DButton>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default EmployeeDelete;
