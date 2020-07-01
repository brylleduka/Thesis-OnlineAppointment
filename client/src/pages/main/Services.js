import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../util/graphql/service";
import {
  DContainer,
  DSection,
  Content,
  DGrid,
  Overlay,
  DCard,
  DImage,
} from "../../components/styled/containers";
import parser from "html-react-parser";
import { HashLink as Link } from "react-router-hash-link";
import ReadMore from "../../components/main/utils/ReadMore";
import ScrollButton from "../../components/main/utils/ScrollButton";
import useScroll from "../../util/hooks/useScroll";
import MouseScroll from "../../components/MouseScroll";
import Spinner from "../../components/Spinner";
import { scrollView } from "../../util/useScrollDown";
import useWindowSize from "../../util/hooks/useWindowSize";

const Services = () => {
  const sectionDown = useRef();
  const scrolling = useScroll(500);
  const { width: wid } = useWindowSize();
  const [isCategories, setIsCategories] = useState([]);
  const { data, loading } = useQuery(FETCH_ALL_CATEGORIES_QUERY, {
    variables: { active: true },
  });

  useEffect(() => {
    if (data) {
      setIsCategories(data.categories);
    }
  }, [data]);

  const scrollDown = () => {
    scrollView(sectionDown);
  };

  return (
    <DContainer id="services">
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
          <h1
            style={{
              fontSize: "38px",
              letterSpacing: "1rem",
              textTransform: "uppercase",
            }}
          >
            Our Services
          </h1>
          <p
            style={{
              fontSize: "18px",
              textAlign: "center",
              letterSpacing: "0.75rem",
            }}
          >
            It's time to take care of your skin
          </p>
          <MouseScroll onClick={scrollDown} inverted />
        </Content>
        <Overlay bgc />
      </DSection>
      <DSection
        width="90%"
        flex
        justify="flex-start"
        align="flex-start"
        direct="column"
        mcenter
        pad="24px"
        height="100%"
        ref={sectionDown}
      >
        <Content width="100%" margin="0 auto" style={{ minHeight: "100vh" }}>
          {loading ? (
            <Content
              width="100%"
              height="100%"
              flex
              justify="center"
              align="center"
            >
              <Spinner content="Loading..." />
            </Content>
          ) : (
            <DGrid three gap="24px" med7={"1fr"}>
              {isCategories.map((category) => (
                <DCard
                  key={category._id}
                  dw={wid < 524 ? "70%" : "90%"}
                  dh="250px"
                  mcenter
                  p="0px"
                  grayzoom
                  overlaying
                >
                  <DImage height="100%" width="100%" grayscaling>
                    <img
                      src={
                        category.imageURL !== null
                          ? category.imageURL
                          : "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/logo.png"
                      }
                      alt={category.name}
                    />
                  </DImage>

                  <Overlay
                    bgc
                    width="100%"
                    height="100%"
                    flex
                    justify="center"
                    align="center"
                    initbox
                  >
                    <div className="overlay-box">
                      <div className="overlay-box__content dark">
                        <h3 className="title">{category.name}</h3>

                        {category.description.length > 100
                          ? parser(category.description.substr(0, 100) + "...")
                          : parser(category.description.substr(0, 100))}

                        <ReadMore center size="14px">
                          View More
                        </ReadMore>
                      </div>
                    </div>
                  </Overlay>
                  <Link to={`/service/${category._id}/#serv`} />
                </DCard>
              ))}
            </DGrid>
          )}
        </Content>
      </DSection>
    </DContainer>
  );
};

export default Services;
