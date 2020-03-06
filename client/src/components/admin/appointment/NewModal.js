import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import { Content } from "../../styled/containers";

const NewModal = ({ setOpen, open }) => {
  return (
    <Modal size="tiny" open={open} onClose={() => setOpen(false)}>
      <Modal.Header>Choose Appointment</Modal.Header>
      <Modal.Content>
        <Content flex justify="space-around" align="center" width="100%">
          <Link to="/zeadmin/new_appointment" className="btn btn-blue">
            Existing Client
          </Link>
          <Link to="/zeadmin/new_appointment" className="btn btn-blue">
            Guest Client
          </Link>
        </Content>
      </Modal.Content>
    </Modal>
  );
};

export default NewModal;
