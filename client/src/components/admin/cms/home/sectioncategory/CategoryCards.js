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
import Slider from "react-slick";

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
    <Content height="auto" width="90%" margin="0 auto">
      {loading ? (
        <Content width="100%" margin="0 auto" height="80vh">
          <Spinner />
        </Content>
      ) : (
        <Slider {...settings}>
          {isCategories.map((category) => (
            <div style={{ margin: "0 auto" }} key={category._id}>
              <DCard
                dw="250px"
                dh="250px"
                margin="0 auto"
                p="0px"
                grayzoom
                overlaying
              >
                <DImage height="100%" width="100%" grayscaling>
                  <img
                    src={
                      category.imageURL !== null
                        ? category.imageURL
                        : "https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/smiling-woman-with-touching-her-cheek-3762185.jpg"
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
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          zIndex: 5,
                        }}
                      >
                        <ReadMore center size="14px">
                          View More
                        </ReadMore>
                      </div>
                    </div>
                  </div>
                </Overlay>
              </DCard>
            </div>
          ))}
        </Slider>
      )}
    </Content>
  );
};

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 3,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToScroll: 1,
        slidesToShow: 1,
      },
    },
  ],
};

export default CategoryCards;
