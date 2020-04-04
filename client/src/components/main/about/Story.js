import React from "react";
import { DSection, Content, DImage } from "../../styled/containers";
import useWindowSize from "../../../util/hooks/useWindowSize";

const Story = ({ content, aboutUS }) => {
  const { width } = useWindowSize();

  return (
    <>
      <DSection
        height="100%"
        width="90%"
        flex
        justify="space-around"
        align="center"
        direct={
          width === 768
            ? "column"
            : aboutUS.missionvision.alt
            ? "row-reverse"
            : "row"
        }
        margin="24px auto 0 auto"
        ref={content}
        id="story"
      >
        <Content
          flex
          justify="flex-start"
          align="center"
          width="100%"
          height="100%"
          direct="column"
          pad="24px"
        >
          <h3>{aboutUS && aboutUS.missionvision.mission.title}</h3>
          {aboutUS && aboutUS.missionvision.mission.subtitle !== "" && (
            <h4>{aboutUS.missionvision.mission.subtitle}</h4>
          )}
          <p>{aboutUS && aboutUS.missionvision.mission.paragraph}</p>
          <h3>{aboutUS && aboutUS.missionvision.vision.title}</h3>
          {aboutUS && aboutUS.missionvision.vision.subtitle !== "" && (
            <h4>{aboutUS.missionvision.vision.subtitle}</h4>
          )}
          <p>{aboutUS && aboutUS.missionvision.vision.paragraph}</p>
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
              src={
                aboutUS.missionvision.photo
                  ? `/images/cms/about/${aboutUS.missionvision.photo}`
                  : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              }
              alt="about"
            />
          </DImage>
        </Content>
      </DSection>
      <DSection
        height="100%"
        width="90%"
        mcenter
        flex
        justify="space-around"
        align="center"
        direct={
          width === 768 ? "column" : aboutUS.story.alt ? "row-reverse" : "row"
        }
      >
        <Content
          flex
          justify="flex-start"
          align="center"
          direct="column"
          width="90%"
          height="100%"
          margin="0 auto"
          pad="24px"
        >
          <DImage height="100%">
            <img
              src={
                aboutUS.story.photo
                  ? `/images/cms/about/${aboutUS.story.photo}`
                  : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              }
              alt="about"
            />
          </DImage>
        </Content>
        <Content
          flex
          justify="flex-start"
          align="center"
          width="100%"
          height="100%"
          direct="column"
          pad="20px"
          style={{ maxHeight: "90vh" }}
        >
          <h3>{aboutUS.story.title}</h3>
          {aboutUS.story.subtitle !== "" && <h4>{aboutUS.story.subtitle}</h4>}
          <p
            style={{
              fontSize: "15px",
              letterSpacing: "2px",
              lineHeight: 1.8,
              textAlign: "justify",
              overflowWrap: "break-word",
              overflow: "auto",
              padding: "10px",
            }}
          >
            {aboutUS.story.paragraph}
          </p>
        </Content>
      </DSection>
    </>
  );
};

export default Story;
