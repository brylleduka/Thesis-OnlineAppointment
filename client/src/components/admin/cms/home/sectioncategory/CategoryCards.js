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
import Spinner from "../../../../Spinner";
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
        <Content width="100%" margin="0 auto" height="80vh">
          <Spinner />
        </Content>
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
