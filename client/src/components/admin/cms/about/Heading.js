import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ABOUT_CMS } from "../../../../util/graphql/cms";
import { DSection, Content, Overlay } from "../../../styled/containers";
import MouseScroll from "../../../MouseScroll";
import ModalHeading from "./ModalHeading";
import Skeleton from "react-loading-skeleton";

const Heading = () => {
  const [isAbout, setIsAbout] = useState({});

  const {
    data: dataAboutContent,
    loading: loadAboutContent
  } = useQuery(FETCH_ABOUT_CMS, { variables: { contentName: "ABOUTUS" } });

  useEffect(() => {
    if (dataAboutContent) {
      setIsAbout(dataAboutContent.aboutUsCMS);
    }
  }, [dataAboutContent]);

  return (
    <>
      {loadAboutContent ? (
        <DSection width="90%" mcenter>
          <Skeleton width="100%" height="50vh" />
        </DSection>
      ) : (
        <DSection
          background={isAbout.bgImg && `/images/cms/about/${isAbout.bgImg}`}
          bgcolor={isAbout.bgColors}
          width="90%"
          mcenter
          height="55vh"
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
            className={isAbout.dark ? "dark" : ""}
          >
            <h1 style={{ fontSize: "38px" }}>About Us</h1>
            <h3>The Concept of Beauty</h3>
            <MouseScroll />
          </Content>
          <Overlay bgc={isAbout.overlay ? true : false} />
          <ModalHeading />
        </DSection>
      )}
    </>
  );
};

export default Heading;
