import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import { DButton } from "../../../../styled/utils";
import ModalSlide from "./ModalSlide";

const NewSlide = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <DButton onClick={() => setOpen(true)}>
        <Icon name="add" />
        New Slide
      </DButton>
      <ModalSlide open={open} setOpen={setOpen} />
    </>
  );
};

export default NewSlide;
