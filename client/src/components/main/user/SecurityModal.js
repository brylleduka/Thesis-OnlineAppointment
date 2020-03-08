import React from "react";
import { Modal } from "semantic-ui-react";
import { DButton } from "../../styled/utils";

const SecurityModal = ({ securityOpen, setSecurityOpen, userInfo }) => {
  return (
    <Modal
      size="small"
      open={securityOpen}
      onClose={() => setSecurityOpen(false)}
    >
      <Modal.Header>Password Change</Modal.Header>
      <Modal.Content></Modal.Content>
      <Modal.Actions>
        <DButton>Save changes</DButton>
      </Modal.Actions>
    </Modal>
  );
};

export default SecurityModal;
