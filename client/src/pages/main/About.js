import React from "react";
import {
  DContainer,
  DSection,
  Content
} from "../../components/styled/containers";

const About = () => {
  return (
    <DContainer>
      <DSection bgcolor="#d3d3d3" height="100vh" push>
        <Content flex justify="center" align="center" fluid height="100%">
          <h3>Hello</h3>
        </Content>
      </DSection>
    </DContainer>
  );
};

export default About;
