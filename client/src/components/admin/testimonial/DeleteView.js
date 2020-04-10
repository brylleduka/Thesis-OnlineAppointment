import React from "react";
import { Modal, Icon } from "semantic-ui-react";
import { MessageSquare } from "@styled-icons/boxicons-solid/MessageSquare";
import { DButton } from "../../../components/styled/utils";

const DeleteView = ({ ridd, rvw, isDltModal, setIsDltModal }) => {
  return (
    <>
      <Modal
        size="small"
        basic
        closeIcon
        onClose={() => setIsDltModal(false)}
        open={isDltModal}
        style={{ zIndex: 9 }}
      >
        <Modal.Header>
          <MessageSquare size="22px" /> Delete this User's Review?
        </Modal.Header>
        <Modal.Content>
          <h3>
            Name: {rvw.user.firstName} {rvw.user.firstName}
          </h3>
          <h4>Message:</h4>
          <p style={{ textIndent: "1em" }}>
            <strong>{rvw.message}</strong>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <DButton confirm onClick={() => console.log(ridd)} basic>
            <Icon name="check" /> Yes
          </DButton>
          <DButton alert onClick={() => setIsDltModal(false)} basic>
            <Icon name="ban" /> No
          </DButton>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default DeleteView;
