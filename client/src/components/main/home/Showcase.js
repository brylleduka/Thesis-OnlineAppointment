import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_SHOWCASE } from "../../../util/graphql/cms";

import { Link } from "react-router-dom";
import { DShowCase, Overlay } from "../../styled/containers";
import { Carousel } from "react-responsive-carousel";

const Showcase = () => {
  const mql = window.matchMedia("(max-width: 768px)");
  const [showcase, setShowcase] = useState({});

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

  return (
    <>
      {!showcaseData ? (
        <DShowCase
          background={
            "https://images.pexels.com/photos/3765134/pexels-photo-3765134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        ></DShowCase>
      ) : (
        <Carousel
          emulateTouch
          infiniteLoop
          useKeyboardArrows
          autoPlay
          showThumbs={false}
          showStatus={false}
          showArrows={mql.matches ? false : true}
        >
          {showcaseData.contentManagements.map(cms => (
            <DShowCase
              background={
                cms.photo !== null || cms.photo !== undefined
                  ? `/images/cms/home/${cms.photo}`
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
        </Carousel>
      )}
    </>
  );
};

export default Showcase;
