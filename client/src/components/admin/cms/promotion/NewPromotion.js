import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import { DButton } from "../../../styled/utils";
import ModalPromo from "./ModalPromo";

const NewPromotion = () => {
  const [newPromoOpen, setNewPromoOpen] = useState(false);
  return (
    <>
      <DButton onClick={() => setNewPromoOpen(true)}>
        <Icon name="add" />
        New Promo
      </DButton>
      <ModalPromo
        newPromoOpen={newPromoOpen}
        setNewPromoOpen={setNewPromoOpen}
      />
    </>
  );
};

export default NewPromotion;
