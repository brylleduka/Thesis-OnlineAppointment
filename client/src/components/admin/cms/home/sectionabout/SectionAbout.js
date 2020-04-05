import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  FETCH_HOME_SECTION,
  FETCH_ABOUT_CMS,
} from "../../../../../util/graphql/cms";
import { Section2Styled, Content } from "../../../../styled/containers";
import EditModal from "./EditModal";
import Spinner from "../../../../Spinner";
import parser from "html-react-parser";

const SectionAbout = () => {
  const [isAbout, setIsAbout] = useState({});
  const [about, setAbout] = useState({});

  const { data: dataAboutSection, loading: loadingAboutSection } = useQuery(
    FETCH_HOME_SECTION,
    {
      variables: { sectionName: "ABOUT" },
    }
  );

  useEffect(() => {
    if (dataAboutSection) {
      setIsAbout(dataAboutSection.homeCMS);
    }
  }, [dataAboutSection]);

  const { data: dataAbout, loading: loadingAbout } = useQuery(FETCH_ABOUT_CMS, {
    variables: { contentName: "ABOUTUS" },
  });

  useEffect(() => {
    if (dataAbout) {
      setAbout(dataAbout.aboutUsCMS);
    }
  }, [dataAbout]);

  return (
    <Section2Styled visible width="90%" alt={isAbout.alt ? true : false}>
      <div className="switch">
        {loadingAboutSection ? (
          <Spinner tiny />
        ) : (
          <EditModal aboutBool={dataAboutSection.homeCMS.alt} />
        )}
      </div>

      <div className="sec2-container">
        <div className="sec2-inner">
          {loadingAbout ? (
            <Content
              margin="0 auto"
              height="100%"
              width="50%"
              flex
              justify="center"
              align="center"
            >
              <Spinner />
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
                    (about.story.paragraph.length > 300
                      ? parser(about.story.paragraph.substr(0, 300)) + "..."
                      : parser(about.story.paragraph.substr(0, 300)))}
                </p>
              </div>
            </div>
          )}

          <div className="sec2-images">
            <div className="sec2-images_inner">
              <div className="sec2-image imgs">
                {loadingAbout ? (
                  <Spinner small />
                ) : (
                  <img
                    src={
                      about.story && about.story.photo
                        ? `/images/cms/about/${about.story.photo}`
                        : "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    }
                  />
                )}
              </div>
              <div className="sec2-image imgs">
                {loadingAbout ? (
                  <Spinner small />
                ) : (
                  <img
                    src={
                      about.missionvision && about.missionvision.photo
                        ? `/images/cms/about/${about.missionvision.photo}`
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

export default SectionAbout;
