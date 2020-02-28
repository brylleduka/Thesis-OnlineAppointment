import React from "react";
import { Link } from "react-router-dom";
import { DShowCase, Overlay } from "../../styled/containers";

const Showcase = () => {
  return (
    <DShowCase
      background={
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
    >
      <h2>Surface</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
        doloribus.
      </p>
      <Link to="/zessence" className="btn">
        Book Appointment
      </Link>
      <Overlay />
    </DShowCase>
  );
};

export default Showcase;
