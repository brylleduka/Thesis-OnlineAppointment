import React, { useRef } from "react";
import {
  DContainer,
  DSection,
  Content,
  Overlay,
  DGrid,
  DImage
} from "../../components/styled/containers";
import { DButton } from "../../components/styled/utils";
import ScrollButton from "../../components/main/utils/ScrollButton";
import useScroll from "../../util/hooks/useScroll";
import { Icon } from "semantic-ui-react";
import Story from "../../components/main/about/Story";
import Team from "../../components/main/about/Team";

const About = () => {
  const content = useRef();
  const scrolling = useScroll(500);

  function scrollView(ref) {
    if (ref.current)
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
  }

  const pageDown = () => {
    scrollView(content);
  };

  return (
    <DContainer>
      {scrolling && <ScrollButton scrollPx="100" delay="16.66" />}
      <DSection
        background={
          "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
        height="85vh"
        fixed
      >
        <Content
          flex
          justify="center"
          direct="column"
          align="center"
          fluid
          height="100%"
        >
          <h3>The Concept of Beauty</h3>
          <DButton
            onClick={pageDown}
            basic
            circle
            default
            size="58px"
            width="58px"
            pad="auto"
            style={{
              position: "absolute",
              bottom: "20px"
            }}
          >
            <Icon
              name="chevron down"
              size="large"
              circular
              style={absoluteCenter}
            />
          </DButton>
        </Content>
        <Overlay />
      </DSection>
      <Story content={content} />

      <Team />
    </DContainer>
  );
};

const absoluteCenter = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "50%",
  transform: "translate(-50%, -50%)",
  display: "block"
};

export default About;
