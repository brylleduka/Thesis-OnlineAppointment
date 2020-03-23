import React, { useRef } from "react";
import {
  DContainer,
  DSection,
  Content,
  Overlay,
  DGrid,
  DImage
} from "../../components/styled/containers";
import { DButton, ScrollUp } from "../../components/styled/utils";
import ScrollButton from "../../components/main/utils/ScrollButton";
import useScroll from "../../util/hooks/useScroll";
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
          width="50%"
          margin="0 auto"
          height="100%"
          style={{ minWidth: "90%", textAlign: "center" }}
          className="dark"
        >
          <h1 style={{ fontSize: "38px" }}>About Us</h1>
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
            <ScrollUp name="chevron down" size="large" circular />
          </DButton>
        </Content>
        <Overlay />
      </DSection>
      <Story content={content} />
      <Team />
    </DContainer>
  );
};

export default About;
