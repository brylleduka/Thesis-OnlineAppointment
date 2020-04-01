import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../../../util/graphql/service";
import { DGrid, Content } from "../../../../styled/containers";
import { JCard } from "../../../../styled/card";
import Skeleton from "react-loading-skeleton";
import parser from "html-react-parser";

const CategoryCards = ({ gridCount }) => {
  const [isCategories, setIsCategories] = useState([]);
  const { data, loading } = useQuery(FETCH_ALL_CATEGORIES_QUERY);

  useEffect(() => {
    if (data) {
      setIsCategories(data.categories);
    }
  }, [data]);
  return (
    <Content height="100%" width="100%">
      {loading ? (
        <DGrid four gap="20px">
          <Skeleton width="100%" height={300} />
          <Skeleton width="100%" height={300} />
          <Skeleton width="100%" height={300} />
          <Skeleton width="100%" height={300} />
        </DGrid>
      ) : (
        <DGrid
          two={gridCount === 2 ? true : false}
          three={gridCount === 3 ? true : false}
          four={gridCount === 4 ? true : false}
          gap="20px"
        >
          {isCategories.map(category => (
            <JCard
              titleSize="24px"
              height="calc(100% - 30%)"
              key={category._id}
            >
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
                </div>
              </figcaption>
            </JCard>
          ))}
        </DGrid>
      )}
    </Content>
  );
};

export default CategoryCards;
