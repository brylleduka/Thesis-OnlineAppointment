import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import { DButton } from "../../../../styled/utils";
import ModalSlide from "./ModalSlide";

const EditSlide = ({ showcase }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DButton onClick={() => setOpen(true)}>
        <Icon name="edit" style={{ color: "white" }} fitted />
      </DButton>
      <ModalSlide open={open} setOpen={setOpen} showcase={showcase} />
    </>
  );
};

export default EditSlide;
