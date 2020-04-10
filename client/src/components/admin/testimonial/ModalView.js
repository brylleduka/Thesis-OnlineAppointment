import React, { useState } from "react";
import { DButton } from "../../styled/utils";
import { Modal, Icon } from "semantic-ui-react";

const ModalView = ({ ridd, open, setOpen }) => {
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Content>{ridd}</Modal.Content>
      </Modal>
    </>
  );
};

export default ModalView;
