import React from "react";
import { Link } from "react-router-dom";
import { DSection, Content } from "../../styled/containers";

const PromoSection1 = () => {
  return (
    <DSection
      background={
        "https://images.pexels.com/photos/735552/pexels-photo-735552.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
      pad="100px 0 0 30px"
      className="dark"
    >
      <Content>
        <h2>The Concept of Beauty</h2>
        <p>Love your Skin. Feel Fabulous.</p>
        <Link to="/appointment" className="btn">
          Book Now!
        </Link>
      </Content>
    </DSection>
  );
};

export default PromoSection1;
