import React from "react";
import { Link } from "react-router-dom";
import { DSection, Content } from "../../styled/containers";

const Section2 = () => {
  return (
    <DSection
      background={
        "https://images.pexels.com/photos/413885/pexels-photo-413885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
      fixed
      pad="100px 0 0 30px"
    >
      <Content>
        <h2>Simply Beauty</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          aliquam culpa veniam harum deleniti nihil, aut quasi ipsam minus.
          Quidem!
        </p>
        <Link to="/" className="btn">
          Book Now!
        </Link>
      </Content>
    </DSection>
  );
};

export default Section2;
