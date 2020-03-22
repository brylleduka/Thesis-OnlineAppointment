import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../util/graphql/service";
import {
  DContainer,
  DSection,
  Content,
  DGrid
} from "../../components/styled/containers";
import { JCard } from "../../components/styled/card";
import Skeleton from "react-loading-skeleton";
import parser from "html-react-parser";
import { Link } from "react-router-dom";
import ReadMore from "../../components/main/utils/ReadMore";

const Services = () => {
  const [isCategories, setIsCategories] = useState([]);

  const { data, loading } = useQuery(FETCH_ALL_CATEGORIES_QUERY);

  useEffect(() => {
    if (data) {
      setIsCategories(data.categories);
    }
  }, [data]);

  console.log(isCategories.map(category => category));

  return (
    <DContainer>
      <DSection
        width="90%"
        flex
        justify="flex-start"
        align="flex-start"
        direct="column"
        mcenter
        pad="24px"
        height="100%"
      >
        <h1>Our Service</h1>
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
                  <Link to={`/zessence/service/${category._id}`}></Link>
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
