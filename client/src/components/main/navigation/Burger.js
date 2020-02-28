import React from "react";
import { bool, func } from "prop-types";
import { DBurger } from "../../styled/navigation";

const Burger = ({ open, setOpen }) => {
  return (
    <DBurger open={open} onClick={() => setOpen(!open)}>
      <div />
      <div />
      <div />
    </DBurger>
  );
};

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired
};

export default Burger;
