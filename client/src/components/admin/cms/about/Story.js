import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { DSection, Content, DImage } from "../../../styled/containers";
import { FETCH_ABOUT_CMS } from "../../../../util/graphql/cms";
import useWindowSize from "../../../../util/hooks/useWindowSize";
import ModalStory from "./ModalStory";
import Spinner from "../../../Spinner";
import parser from "html-react-parser";

const Story = () => {
  const { width } = useWindowSize();
  const [isStory, setIsStory] = useState({});

  const {
    data: dataStoryContent,
    loading: loadStoryContent,
  } = useQuery(FETCH_ABOUT_CMS, { variables: { contentName: "ABOUTUS" } });

  useEffect(() => {
    if (dataStoryContent) {
      setIsStory(dataStoryContent.aboutUsCMS.story);
    }
  }, [dataStoryContent]);

  return (
    <>
      {loadStoryContent ? (
        <DSection width="90%" mcenter>
          <Spinner />
        </DSection>
      ) : (
        <DSection
          height="100%"
          width="90%"
          mcenter
          flex
          justify="space-around"
          align="center"
          direct={
            width === 768 ? "column" : isStory.alt ? "row-reverse" : "row"
          }
        >
          <ModalStory isStory={dataStoryContent.aboutUsCMS.story} />

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
                  isStory
                    ? isStory.imageURL
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
            <h3>{isStory.title}</h3>
            {isStory.subtitle !== "" && <h4>{isStory.subtitle}</h4>}
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
              {isStory.paragraph}
            </p>
          </Content>
        </DSection>
      )}
    </>
  );
};

export default Story;
