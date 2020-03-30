import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_THE_SHOWCASE } from "../../../../../util/graphql/cms";
import {
  DShowCase,
  Overlay,
  DSection,
  DImage
} from "../../../../styled/containers";
import { DButton } from "../../../../styled/utils";
import NewSlide from "./NewSlide";
import EditSlide from "./EditSlide";
import { Icon } from "semantic-ui-react";
import Slider from "react-slick";

const Showcase = () => {
  const mql = window.matchMedia("(max-width: 768px)");
  const [showcase, setShowcase] = useState([]);

  const { data: showcaseData, loading: dataLoading } = useQuery(
    FETCH_THE_SHOWCASE,
    {
      variables: {
        sectionName: "SHOWCASE"
      }
    }
  );

  useEffect(() => {
    if (showcaseData) {
      setShowcase(showcaseData.homeCMS.content);
    }
  }, [showcaseData]);

  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <DSection width="900px" mcenter>
      <NewSlide />
      {dataLoading ? (
        <DShowCase height="70vh">
          <DImage height="100%">
            <img
              src="https://images.pexels.com/photos/3765134/pexels-photo-3765134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="showcase"
            />
          </DImage>
        </DShowCase>
      ) : (
        <Slider {...settings}>
          {showcase.map(sc => (
            <DShowCase height="70vh" key={sc._id} bgcolor={sc.bgColor}>
              {sc.bgImg && (
                <DImage height="100%">
                  <img
                    src={
                      sc.bgImg !== null || sc.bgImg !== undefined
                        ? `/images/cms/home/${sc.bgImg}`
                        : "https://images.pexels.com/photos/3765134/pexels-photo-3765134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    }
                    alt="showcase"
                  />
                </DImage>
              )}

              <Overlay
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
              </Overlay>
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 20,
                  zIndex: 2,
                  width: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <EditSlide showcase={sc} />
                <DButton alert>
                  <Icon name="trash" style={{ color: "white" }} fitted />
                </DButton>
              </div>
            </DShowCase>
          ))}
        </Slider>
      )}
    </DSection>
  );
};

export default Showcase;
