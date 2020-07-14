import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_THE_SHOWCASE } from "../../../../../util/graphql/cms";
import {
  DShowCase,
  DSection,
  DImage,
  ShowcaseOverlay,
} from "../../../../styled/containers";
import NewSlide from "./NewSlide";
import EditSlide from "./EditSlide";
import RemoveSlide from "./RemoveSlide";
import Slider from "react-slick";

const Showcase = () => {
  const [showcase, setShowcase] = useState([]);

  const { data: showcaseData, loading: dataLoading } = useQuery(
    FETCH_THE_SHOWCASE,
    {
      variables: {
        sectionName: "SHOWCASE",
      },
    }
  );

  useEffect(() => {
    if (showcaseData) {
      setShowcase(showcaseData.showcaseCMS.content);
    }
  }, [showcaseData]);

  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <DSection width="90%" height="100%" mcenter>
      <NewSlide />
      <div style={{ position: "relative" }}>
        {dataLoading ? (
          <DShowCase height="80vh">
            <DImage height="100%">
              <img
                src="https://images.pexels.com/photos/3765134/pexels-photo-3765134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="showcase"
              />
            </DImage>
          </DShowCase>
        ) : (
          <Slider {...settings}>
            {showcase.map((sc) => (
              <DShowCase
                height="80vh"
                key={sc._id}
                background={sc.bgImgURL && sc.bgImgURL}
                bgcolor={sc.bgColor}
              >
                <ShowcaseOverlay
                  titleSize="68px"
                  greetSize="20px"
                  paragSize="16px"
                  bgr={sc.position === "right" ? true : null}
                  bgl={sc.position === "left" ? true : null}
                  bgc={sc.position === "center" ? true : null}
                >
                  <div className="overlay-content">
                    <h3 className="greeting">{sc.subtitle}</h3>
                    <h1 className="title">{sc.title}</h1>
                    <p className="content">{sc.paragraph}</p>
                  </div>
                </ShowcaseOverlay>
                {/* <Overlay
                  flex
                  bgr={sc.dark && sc.position === "right" ? true : false}
                  bgl={sc.dark && sc.position === "left" ? true : false}
                  bgc={sc.dark && sc.position === "center" ? true : false}
                  justify={
                    sc.position === "left"
                      ? "flex-start"
                      : sc.position === "right"
                      ? "flex-end"
                      : sc.position === "center"
                      ? "center"
                      : ""
                  }
                  talign={
                    sc.position === "left"
                      ? "left"
                      : sc.position === "right"
                      ? "right"
                      : sc.position === "center"
                      ? "center"
                      : ""
                  }
                  align="center"
                  className={sc.dark ? "dark" : ""}
                >
                  <div className="overlay-content">
                    <h1>{sc.title}</h1>
                    <h2>{sc.subtitle}</h2>
                    <p>{sc.paragraph}</p>
                  </div>
                </Overlay> */}
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 20,
                    zIndex: 2,
                    width: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <EditSlide showcase={sc} />
                  <RemoveSlide showcase={sc} />
                </div>
              </DShowCase>
            ))}
          </Slider>
        )}
      </div>
    </DSection>
  );
};

export default Showcase;
