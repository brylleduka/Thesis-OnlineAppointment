import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_SHOWCASE } from "../../../util/graphql/cms";
import { Link } from "react-router-dom";
import { DShowCase, Overlay } from "../../styled/containers";
import { DButton } from "../../styled/utils";
import { Icon } from "semantic-ui-react";
import Slider from "react-slick";

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
    FETCH_SHOWCASE,
    {
      variables: {
        section: "SHOWCASE"
      }
    }
  );

  useEffect(() => {
    if (showcaseData) {
      setShowcase(showcaseData.contentManagements);
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
    <div style={{ position: "relative" }} id="home">
      <DButton
        onClick={scrollDown}
        basic
        circle
        default
        size="48px"
        width="48px"
        pad="auto"
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 5
        }}
      >
        <Icon
          name="chevron down"
          size="large"
          circular
          style={absoluteCenter}
        />
      </DButton>
      {dataLoading ? (
        <DShowCase
          height="90vh"
          background={
            "https://images.pexels.com/photos/3765134/pexels-photo-3765134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        ></DShowCase>
      ) : (
        <Slider {...settings}>
          {showcaseData &&
            showcaseData.contentManagements.map(sc => (
              <DShowCase
                height="90vh"
                key={sc._id}
                background={
                  sc.photo !== null || sc.photo !== undefined
                    ? `/images/cms/home/${sc.photo}`
                    : "https://images.pexels.com/photos/3765134/pexels-photo-3765134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                }
              >
                <Overlay
                  bg={
                    "linear-gradient(to right, rgba(0,0,0,0.7), rgba(255,255,255,0.1))"
                  }
                  flex
                  justify="flex-start"
                  align="center"
                >
                  <div className="overlay-content">
                    <h1>Z Essence Facial & Spa</h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam, doloribus.
                    </p>
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
