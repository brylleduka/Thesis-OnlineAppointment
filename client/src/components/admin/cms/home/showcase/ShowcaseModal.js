import React from "react";

import { Modal } from "semantic-ui-react";

const ShowcaseModal = ({ openEdit, setOpenEdit, showcase }) => {
  return (
    <Modal size="small" open={openEdit} onClose={() => setOpenEdit(false)}>
      <Modal.Header></Modal.Header>
      <Modal.Content>{showcase}</Modal.Content>
    </Modal>
  );
};

export default ShowcaseModal;
