import React, { useState } from "react";
import { DotsVertical } from "../../../components/styled/utils";
import { Popup, Grid, Icon } from "semantic-ui-react";
import { DButton } from "../../../components/styled/utils";
import ModalView from "../../../components/admin/testimonial/ModalView";
import DeleteView from "../../../components/admin/testimonial/DeleteView";

const MenuView = ({ menuId, review }) => {
  const [menuValue, setMenuValue] = useState("");
  const [isDltModal, setIsDltModal] = useState(false);
  const [open, setOpen] = useState(false);

  const handleMenu = (e) => {
    setMenuValue(e.currentTarget.dataset.rid);
  };

  const modalDeleteShow = () => {
    setIsDltModal(true);
  };

  return (
    <>
      <Popup
        on="click"
        trigger={
          <DotsVertical
            size="24px"
            data-rid={menuId}
            onMouseOver={handleMenu}
          />
        }
        flowing
        position="top right"
        style={{ zIndex: 3 }}
      >
        <Grid centered divided columns={2}>
          <Grid.Column textAlign="center">
            <DButton alert>
              <Icon name="trash" fitted onClick={modalDeleteShow} />
            </DButton>
          </Grid.Column>
          <Grid.Column>
            <DButton confirm onClick={() => setOpen(true)}>
              <Icon name="eye" fitted />
            </DButton>
          </Grid.Column>
        </Grid>
      </Popup>

      <DeleteView
        ridd={menuValue}
        rvw={review}
        setIsDltModal={setIsDltModal}
        isDltModal={isDltModal}
      />
      <ModalView ridd={menuValue} open={open} setOpen={setOpen} />
    </>
  );
};

export default MenuView;
