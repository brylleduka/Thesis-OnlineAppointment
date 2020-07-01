import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_THE_SHOWCASE } from "../../util/graphql/cms";
import {
  DContainer,
  DSection,
  Content,
  Overlay,
} from "../../components/styled/containers";

import ScrollButton from "../../components/main/utils/ScrollButton";
import useScroll from "../../util/hooks/useScroll";
import TestimonialCard from "../../components/main/testimonial/TestimonialCard";
import { scrollView } from "../../util/useScrollDown";
import MouseScroll from "../../components/MouseScroll";

const Testimonials = () => {
  const content = useRef();
  const scrolling = useScroll(500);
  const [isShowcase, setIsShowcase] = useState([]);

  const { data: dataShowcase, loading: loadShowcase } = useQuery(
    FETCH_THE_SHOWCASE,
    {
      variables: {
        sectionName: "SHOWCASE",
      },
    }
  );

  useEffect(() => {
    if (dataShowcase) {
      setIsShowcase(dataShowcase.showcaseCMS.content);
    }
  }, [dataShowcase]);

  const scrollDown = () => {
    scrollView(content);
  };
  return (
    <DContainer>
      {scrolling && <ScrollButton scrollPx="100" delay="16.66" />}
      <DSection
        background={
          isShowcase[2] !== undefined
            ? isShowcase[2].bgImgURL
            : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
        height="85vh"
        fixed
        id="tstmnl"
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
          <h1 style={{ fontSize: "48px", fontWeight: 700 }}>
            What Our Client Says
          </h1>
          {/* <h3>We continously improve our service</h3> */}
          <MouseScroll onClick={scrollDown} inverted />
        </Content>
        <Overlay bgc />
      </DSection>
      <TestimonialCard content={content} />
    </DContainer>
  );
};

export default Testimonials;
