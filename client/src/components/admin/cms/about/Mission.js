import React from "react";
import { DSection, Content, DImage } from "../../../styled/containers";
import { DButtonFree } from "../../../styled/utils";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import useWindowSize from "../../../../util/hooks/useWindowSize";

const Story = () => {
  const { width } = useWindowSize();
  return (
    <DSection
      height="100%"
      width="90%"
      flex
      justify="space-around"
      align="center"
      direct={width === 768 ? "column" : "row"}
      margin="24px auto 0 auto"
    >
      <DButtonFree top={0} right={0}>
        <Icon name="edit" fitted />
      </DButtonFree>
      <Content
        flex
        justify="flex-start"
        align="center"
        width="100%"
        height="100%"
        direct="column"
        pad="24px"
      >
        <h3>Our Mission</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero quia at
          alias reiciendis voluptatum illo quidem natus quod porro voluptatem?
          Obcaecati totam libero rerum nihil nemo, iusto aliquid repellendus
          repudiandae?
        </p>
        <h3>Our Vision</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero quia at
          alias reiciendis voluptatum illo quidem natus quod porro voluptatem?
          Obcaecati totam libero rerum nihil nemo, iusto aliquid repellendus
          repudiandae?
        </p>
      </Content>
      <Content
        flex
        justify="flex-start"
        align="center"
        direct="column"
        width="100%"
        height="100%"
        margin="0 auto"
        pad="24px"
      >
        <DImage height="100%">
          <img
            src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="about"
          />
        </DImage>
      </Content>
    </DSection>
  );
};

export default Story;
