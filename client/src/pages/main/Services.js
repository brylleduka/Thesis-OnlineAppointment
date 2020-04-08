import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../util/graphql/service";
import {
  DContainer,
  DSection,
  Content,
  DGrid,
  Overlay
} from "../../components/styled/containers";
import { JCard } from "../../components/styled/card";
import Skeleton from "react-loading-skeleton";
import parser from "html-react-parser";
import { Link } from "react-router-dom";
import ReadMore from "../../components/main/utils/ReadMore";
import ScrollButton from "../../components/main/utils/ScrollButton";
import useScroll from "../../util/hooks/useScroll";
import MouseScroll from "../../components/MouseScroll";
import { scrollView } from "../../util/useScrollDown";

const Services = () => {
  const sectionDown = useRef();
  const scrolling = useScroll(500);
  const [isCategories, setIsCategories] = useState([]);
  const { data, loading } = useQuery(FETCH_ALL_CATEGORIES_QUERY);

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
          <h1 style={{ fontSize: "48px" }}>Our Services</h1>
          <h3>It's time to take care of your skin</h3>
          <MouseScroll onClick={scrollDown} />
        </Content>
        <Overlay
          bg={"linear-gradient(to top, rgba(0,0,0,0.3), rgba(255,255,255,0.1))"}
        />
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
          <DGrid three gap="24px" med7={"1fr"}>
            {loading ? (
              <>
                <Skeleton width={400} height={300} />
                <Skeleton width={400} height={300} />
                <Skeleton width={400} height={300} />
              </>
            ) : (
              isCategories.map(category => (
                <JCard>
                  <img
                    src={
                      category.photo !== null
                        ? `/images/service/${category.photo}`
                        : "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample108.jpg"
                    }
                    alt={category.name}
                  />
                  <figcaption>
                    <h3>{parser(category.name)}</h3>
                    <div className="description">
                      <p>
                        {category.description.length > 100
                          ? parser(category.description.substr(0, 100) + "...")
                          : parser(category.description.substr(0, 100))}
                      </p>
                      <ReadMore hover={0}>View Services</ReadMore>
                    </div>
                  </figcaption>
                  <Link to={`/service/${category._id}`}></Link>
                </JCard>
              ))
            )}
          </DGrid>
        </Content>
      </DSection>
    </DContainer>
  );
};

export default Services;
