import React from "react";
import { Modal } from "semantic-ui-react";
import { DButton } from "../../styled/utils";

const EmailModal = ({ emailOpen, setEmailOpen, userInfo }) => {
  return (
    <Modal size="tiny" open={emailOpen} onClose={() => setEmailOpen(false)}>
      <Modal.Header>Email Address</Modal.Header>
      <Modal.Content></Modal.Content>
      <Modal.Actions>
        <DButton>Save changes</DButton>
      </Modal.Actions>
    </Modal>
  );
};

export default EmailModal;
