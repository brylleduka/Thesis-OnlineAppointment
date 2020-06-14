import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_CATEGORIES_QUERY } from "../../../../../util/graphql/service";
import {
  DGrid,
  Content,
  Overlay,
  DImage,
  DCard,
} from "../../../../styled/containers";
import useWindowSize from "../../../../../util/hooks/useWindowSize";
import ReadMore from "../../../../ReadMore";
import Skeleton from "react-loading-skeleton";
import parser from "html-react-parser";
import Page404 from "../../../../../pages/Page404";

const CategoryCards = ({ gridCount }) => {
  const { width: wid } = useWindowSize();
  const [isCategories, setIsCategories] = useState([]);
  const { data, loading, error } = useQuery(FETCH_ALL_CATEGORIES_QUERY, {
    variables: { active: true },
  });

  useEffect(() => {
    if (data) {
      setIsCategories(data.categories);
    }
  }, [data]);

  if (error) return Page404;

  return (
    <Content height="auto" width="100%">
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
                    category.photo
                      ? `/images/service/${category.photo}`
                      : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
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
                      Learn More
                    </ReadMore>
                  </div>
                </div>
              </Overlay>
            </DCard>
          ))}
        </DGrid>
      )}
    </Content>
  );
};

export default CategoryCards;
