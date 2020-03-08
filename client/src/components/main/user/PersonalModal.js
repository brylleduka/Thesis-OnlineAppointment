import React from "react";
import { Modal } from "semantic-ui-react";
import { DButton } from "../../styled/utils";

const PersonalModal = ({ personalOpen, setPersonalOpen, userInfo }) => {
  return (
    <Modal
      size="small"
      open={personalOpen}
      onClose={() => setPersonalOpen(false)}
    >
      <Modal.Header>Personal Details</Modal.Header>
      <Modal.Content></Modal.Content>
      <Modal.Actions>
        <DButton>Save changes</DButton>
      </Modal.Actions>
    </Modal>
  );
};

export default PersonalModal;
