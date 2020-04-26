import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Content } from "../../styled/containers";
import { DButton, IconWrap } from "../../styled/utils";
import Spinner from "../../Spinner";
import { Delete, DeleteForever } from "@styled-icons/material";
import { Warning } from "@styled-icons/material-rounded";
import { Check } from "@styled-icons/entypo";
import { Cancel } from "@styled-icons/typicons";
import { Question } from "@styled-icons/fa-solid";
import { Popup, Modal, Grid } from "semantic-ui-react";

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
            <IconWrap
              circle
              shadow
              bgcolor="#232323"
              tiny
              mcenter
              title="Info"
              pad="3px"
            >
              <Question />
            </IconWrap>
          }
          inverted
          position="top right"
          size="tiny"
        >
          <p style={{ fontWeight: 700 }}>
            Store in archive or permanently delete this employee information.
          </p>
        </Popup>
      </Content>
      <Modal
        basic
        size="small"
        open={isDlt}
        onClose={() => setIsDlt(false)}
        closeIcon
      >
        <Modal.Header>{`Archive Employee: ${employee.title} ${employee.firstName} ${employee.lastName}`}</Modal.Header>
        <Modal.Content>
          <p style={{ fontWeight: 500 }}>
            Are you sure you want to put employee to archive? By doing so, it
            will remove employee to other files. You can still restore after
            this employee by going to{" "}
            <strong>File Maintenance/Archive Files</strong>
          </p>
        </Modal.Content>
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
                on="click"
                trigger={
                  <DButton alert flex>
                    <DeleteForever size="22px" />
                    Delete Permanently
                  </DButton>
                }
                position="top center"
                inverted
                flowing
              >
                <Grid divided columns={2}>
                  <Grid.Column>
                    <IconWrap size="22px" color="green" margin="0 auto">
                      <Check title="Confirm deleting permanently" />
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
              <DButton basic confirm>
                Confirm
              </DButton>
            </Content>
          </Content>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default EmployeeDelete;
