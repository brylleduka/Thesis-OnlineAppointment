import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_THE_SHOWCASE } from "../../../util/graphql/cms";

import { Link } from "react-router-dom";
import { DShowCase, ShowcaseOverlay } from "../../styled/containers";
import { JButton } from "../../styled/button";
import Slider from "react-slick";
import MouseScroll from "../../MouseScroll";
import useWindowSize from "../../../util/hooks/useWindowSize";

const Showcase = ({ nextSection }) => {
  const { width: wid } = useWindowSize();
  const [showcase, setShowcase] = useState([]);

  function scrollView(ref) {
    if (ref.current)
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }

  const scrollDown = () => {
    scrollView(nextSection);
  };

  const { data: showcaseData, loading: dataLoading, error } = useQuery(
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
    autoplay: true,
    autoplaySpeed: 7000,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div style={{ position: "relative" }} id="home">
      {dataLoading ? (
        <DShowCase
          background={
            "https://images.pexels.com/photos/3765134/pexels-photo-3765134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        ></DShowCase>
      ) : (
        <Slider {...settings}>
          {showcase.map((sc) => (
            <div className="slider_holder">
              <DShowCase
                key={sc._id}
                bgcolor={sc.bgColor}
                background={sc.bgImgURL && sc.bgImgURL}
              >
                {/* {sc.bgImg && (
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
              )} */}
                <ShowcaseOverlay
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
                  cmarg={
                    sc.position === "left"
                      ? "0 0 0 5rem"
                      : sc.position === "right"
                      ? "0 5rem 0 0"
                      : "0"
                  }
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
                    <div className="title-container">
                      <h1 className="title">{sc.title}</h1>

                      <div className="title_logo">
                        <DImage objFit="contain" height="65px" width="65px">
                          <img src="https://zessencefacial.s3-ap-southeast-1.amazonaws.com/global/logo.png" />
                        </DImage>
                      </div>
                    </div>

                    <h3 className="subtitle">{sc.subtitle}</h3>
                    <p className="paragraph">{sc.paragraph}</p>
                    <JButton
                      className={sc.dark ? "dark" : ""}
                      dark={sc.dark ? true : false}
                    >
                      Book Appointment
                      <Link to="/appointment" />
                    </JButton>
                  </div>
                </Overlay> */}
                <MouseScroll onClick={scrollDown} inverted />
              </DShowCase>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

const absoluteCenter = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "50%",
  transform: "translate(-50%, -50%)",
  display: "block",
};

export default Showcase;
