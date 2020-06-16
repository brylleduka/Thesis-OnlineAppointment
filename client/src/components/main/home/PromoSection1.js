import React from "react";
import { Link } from "react-router-dom";
import { DSection, Content } from "../../styled/containers";

const PromoSection1 = () => {
  return (
    <DSection
      background={"/images/bgem.jpg"}
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
