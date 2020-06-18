import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ABOUT_CMS } from "../../util/graphql/cms";
import {
  DContainer,
  DSection,
  Content,
  Overlay,
  DGrid,
} from "../../components/styled/containers";
import ScrollButton from "../../components/main/utils/ScrollButton";
import useScroll from "../../util/hooks/useScroll";
import Story from "../../components/main/about/Story";
import Team from "../../components/main/about/Team";
import MouseScroll from "../../components/MouseScroll";
import { scrollView } from "../../util/useScrollDown";
import Spinner from "../../components/Spinner";

const About = () => {
  const content = useRef();
  const scrolling = useScroll(500);
  const [about, setAbout] = useState({});

  const { data: dataAbout, loading: loadAbout } = useQuery(FETCH_ABOUT_CMS, {
    variables: { contentName: "ABOUTUS" },
  });

  useEffect(() => {
    if (dataAbout) {
      setAbout(dataAbout.aboutUsCMS);
    }
  }, [dataAbout]);

  const scrollDown = () => {
    scrollView(content);
  };

  return (
    <DContainer>
      {scrolling && <ScrollButton scrollPx="100" delay="16.66" />}

      <>
        <DSection
          background={
            about.bgImgURL
              ? about.bgImgURL
              : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
          bgcolor={about.bgColor}
          height="85vh"
          fixed
          id="about"
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
            <h1 style={{ fontSize: "38px" }}>
              {about.title ? about.title : "ABOUT US"}
            </h1>
            {loadAbout && <Spinner medium inverted />}
            {about.subtitle !== "" && <h3>{about.subtitles}</h3>}
            <MouseScroll
              onClick={scrollDown}
              inverted={about.dark ? true : false}
            />
          </Content>
          <Overlay bgc={about.overlay ? true : false} />
        </DSection>
        {loadAbout ? (
          <DSection
            width="90%"
            height="100%"
            flex
            justify="space-around"
            align="center"
            direct="column"
            margin="20px auto"
            pad="20px 0"
          >
            <Spinner content="Please wait while we fetch data..." />
          </DSection>
        ) : (
          <Story content={content} aboutUS={dataAbout.aboutUsCMS} />
        )}
      </>

      <Team />
    </DContainer>
  );
};

export default About;
