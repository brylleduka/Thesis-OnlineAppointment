import React, { useRef, useEffect, useState } from "react";
import { FETCH_ABOUT_SECTION } from "../../../util/graphql/cms";
import { useQuery } from "@apollo/react-hooks";
import { HashLink as Link } from "react-router-hash-link";
import { Section2Styled } from "../../styled/containers";
import { TweenMax, TimelineLite, Power3 } from "gsap";
import ReadMore from "../utils/ReadMore";

const AboutSection = ({ nextSection }) => {
  const [isAboutSection, setIsAboutSection] = useState({});

  const {
    data: aboutChange,
    loading: loadAboutChange
  } = useQuery(FETCH_ABOUT_SECTION, { variables: { sectionName: "ABOUT" } });

  useEffect(() => {
    if (aboutChange) {
      setIsAboutSection(aboutChange.homeCMS);
    }
  }, [aboutChange]);

  console.log(isAboutSection);

  let section2 = useRef(null);
  let images = useRef(null);
  let tl = new TimelineLite();

  const animate = () => {
    const img1 = images.firstElementChild;
    const img2 = images.lastElementChild;

    TweenMax.to(section2, 0, { css: { visibility: "visible" } });

    tl.from(img1, 1.2, { y: 1280, ease: Power3.easeOut })
      .from(
        img1.firstElementChild,
        2,
        { scale: 1.6, ease: Power3.easeOut },
        0.2
      )
      .from(img2, 1.2, { y: 1280, ease: Power3.easeOut }, 0.2)
      .from(
        img2.firstElementChild,
        2,
        { scale: 1.6, ease: Power3.easeOut },
        0.2
      );
  };

  useEffect(() => {
    //Images vars
    animate();
  }, []);

  return (
    <Section2Styled
      ref={el => (section2 = el)}
      alt={isAboutSection && isAboutSection.alt === true ? true : false}
    >
      <div className="sec2-container" ref={nextSection}>
        <div className="sec2-inner">
          <div className="sec2-content">
            <div className="sec2-content_inner">
              <h1>
                <div className="sec2-content_line">
                  <div className="sec2-content_line-inner">Z Essence</div>
                </div>
                <div className="sec2-content_line">
                  <div className="sec2-content_line-inner">Facial & Spa</div>
                </div>
              </h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
                labore dolore ad nemo, veritatis iure mollitia impedit. Quod, id
                tempore? Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Placeat dolorum repudiandae tempora, sunt nostrum
                explicabo. Doloribus, quis est, corporis deserunt excepturi
                praesentium fugit eius minus laudantium nesciunt modi temporibus
                vitae.
              </p>
              <ReadMore>
                <Link to="/zessence/about/#story">Learn More</Link>
              </ReadMore>
            </div>
          </div>
          <div className="sec2-images">
            <div className="sec2-images_inner" ref={el => (images = el)}>
              <div className="sec2-image imgs">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="about"
                />
              </div>
              <div className="sec2-image imgs">
                <img
                  src="https://images.pexels.com/photos/3779501/pexels-photo-3779501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="about"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section2Styled>
  );
};

export default AboutSection;
