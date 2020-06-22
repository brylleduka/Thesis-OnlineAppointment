import React, { useRef, useEffect, useState } from "react";
import { FETCH_HOME_SECTION, FETCH_ABOUT_CMS } from "../../../util/graphql/cms";
import { useQuery } from "@apollo/react-hooks";
import { HashLink as Link } from "react-router-hash-link";
import { Section2Styled, Content } from "../../styled/containers";
import { TweenMax, TimelineLite, Power3 } from "gsap";
import ReadMore from "../utils/ReadMore";
import parser from "html-react-parser";
import Spinner from "../../Spinner";
import useWindowSize from "../../../util/hooks/useWindowSize";
import truncateString from "../../../util/hooks/truncateString";

const AboutSection = ({ nextSection }) => {
  const { width: wid } = useWindowSize();
  const [isAboutSection, setIsAboutSection] = useState({});
  const [about, setAbout] = useState({});

  const {
    data: aboutChange,
    loading: loadAboutChange,
  } = useQuery(FETCH_HOME_SECTION, { variables: { sectionName: "ABOUT" } });

  useEffect(() => {
    if (aboutChange) {
      setIsAboutSection(aboutChange.homeCMS);
    }
  }, [aboutChange]);

  const { data: dataAbout, loading: loadAbout } = useQuery(FETCH_ABOUT_CMS, {
    variables: { contentName: "ABOUTUS" },
  });

  useEffect(() => {
    if (dataAbout) {
      setAbout(dataAbout.aboutUsCMS);
    }
  }, [dataAbout]);

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
      ref={(el) => (section2 = el)}
      alt={isAboutSection.alt ? true : undefined}
    >
      <div className="sec2-container" ref={nextSection}>
        <div className="sec2-inner">
          {loadAbout ? (
            <Content
              margin="0 auto"
              height="100%"
              width="50%"
              flex
              justify="center"
              align="center"
            >
              <Spinner medium />
            </Content>
          ) : (
            <div className="sec2-content">
              <div className="sec2-content_inner">
                <h1>
                  <div className="sec2-content_line">
                    <div className="sec2-content_line-inner">{about.title}</div>
                  </div>
                  <div className="sec2-content_line">
                    <div className="sec2-content_line-inner subtitle">
                      {about.story && about.story.title}
                    </div>
                  </div>
                </h1>
                <p>
                  {about.story &&
                    (about.story.paragraph.length > 800 && wid < 768
                      ? parser(
                          truncateString(about.story.paragraph, 400) + "..."
                        )
                      : parser(
                          truncateString(about.story.paragraph, 800) + "..."
                        ))}
                </p>
                <ReadMore style={{ padding: "5px", fontSize: "14px" }}>
                  <Link to="/about/#story">Read More</Link>
                </ReadMore>
              </div>
            </div>
          )}

          <div className="sec2-images">
            <div className="sec2-images_inner" ref={(el) => (images = el)}>
              <div className="sec2-image imgs">
                {loadAbout ? (
                  <Spinner small />
                ) : (
                  <img
                    src={
                      about.story && about.story.imageURL
                        ? about.story.imageURL
                        : "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    }
                  />
                )}
              </div>
              <div className="sec2-image imgs">
                {loadAbout ? (
                  <Spinner small />
                ) : (
                  <img
                    src={
                      about.missionvision && about.missionvision.imageURL
                        ? about.missionvision.imageURL
                        : "https://images.pexels.com/photos/3779501/pexels-photo-3779501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section2Styled>
  );
};

export default AboutSection;
