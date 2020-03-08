import React from "react";
import { Modal } from "semantic-ui-react";

const ShowcaseModal = ({ open, setOpen, showcase }) => {
  return (
    <Modal size="small" open={open} onClose={() => setOpen(false)}>
      <Modal.Header></Modal.Header>
      <Modal.Content>{showcase._id}</Modal.Content>
    </Modal>
  );
};

export default ShowcaseModal;
