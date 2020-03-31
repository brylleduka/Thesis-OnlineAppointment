import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../util/graphql/service";
import { Link } from "react-router-dom";
import { DGrid, DSection, Content } from "../../styled/containers";
import { JCard } from "../../styled/card";
import FancyText from "../../FancyText";
import Skeleton from "react-loading-skeleton";
import parser from "html-react-parser";
import ReadMore from "../utils/ReadMore";

const CategorySection = ({ setRef }) => {
  const [isCategories, setIsCategories] = useState([]);
  const { data, loading } = useQuery(FETCH_ALL_CATEGORIES_QUERY);

  useEffect(() => {
    if (data) {
      setIsCategories(data.categories);
    }
  }, [data]);

  return (
    <DSection
      flex
      justify="center"
      align="center"
      direct="column"
      height="100%"
      width="90%"
      margin="48px auto"
      ref={setRef}
    >
      <FancyText size="38px">What We Offer</FancyText>
      <Content height="100%" width="100%">
        <DGrid two margin="0 0 40px 0" gap="20px">
          {loading ? (
            <>
              <Skeleton width={300} height={300} />
              <Skeleton width={300} height={300} />
              <Skeleton width={300} height={300} />
              <Skeleton width={300} height={300} />
            </>
          ) : (
            isCategories.map(category => (
              <JCard titleSize="22px" key={category._id}>
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
                      {category.description.length > 50
                        ? parser(category.description.substr(0, 50) + "...")
                        : parser(category.description.substr(0, 50))}
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
  );
};

export default CategorySection;
