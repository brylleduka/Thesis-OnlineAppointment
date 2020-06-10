import React from "react";
import { bool, func } from "prop-types";
import { DBurger } from "../../styled/navigation";
import useScroll from "../../../util/hooks/useScroll";

const Burger = ({ open, setOpen }) => {
  const scrolling = useScroll();
  return (
    <DBurger
      open={open}
      onClick={() => setOpen(!open)}
      scrolled={scrolling ? true : false}
    >
      <div />
      <div />
      <div />
    </DBurger>
  );
};

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Burger;
