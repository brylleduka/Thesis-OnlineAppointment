import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_THE_SHOWCASE } from "../../../util/graphql/cms";
import { Link } from "react-router-dom";
import { DShowCase, Overlay, DImage } from "../../styled/containers";
import Slider from "react-slick";
import MouseScroll from "../../MouseScroll";

const Showcase = ({ nextSection }) => {
  const mql = window.matchMedia("(max-width: 768px)");
  const [showcase, setShowcase] = useState([]);

  function scrollView(ref) {
    if (ref.current)
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
  }

  const scrollDown = () => {
    scrollView(nextSection);
  };

  const { data: showcaseData, loading: dataLoading, error } = useQuery(
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
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <div style={{ position: "relative" }} id="home">
      <MouseScroll onClick={scrollDown} />
      {dataLoading ? (
        <DShowCase
          height="90vh"
          background={
            "https://images.pexels.com/photos/3765134/pexels-photo-3765134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        ></DShowCase>
      ) : (
        <Slider {...settings}>
          {showcase.map(sc => (
            <DShowCase
              height="90vh"
              key={sc._id}
              bgcolor={sc.bgColor}
              background={sc.bgImg && `/images/cms/home/${sc.bgImg}`}
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
                  <Link to="/zessence" className="btn">
                    Book Appointment
                  </Link>
                </div>
              </Overlay>
            </DShowCase>
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
  display: "block"
};

export default Showcase;
