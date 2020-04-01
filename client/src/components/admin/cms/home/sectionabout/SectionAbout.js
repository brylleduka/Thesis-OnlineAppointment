import React, { useState, useEffect } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { FETCH_HOME_SECTION } from "../../../../../util/graphql/cms";
import { Section2Styled } from "../../../../styled/containers";
import EditModal from "./EditModal";

const SectionAbout = () => {
  const [isAbout, setIsAbout] = useState({});

  const { data: dataAboutSection, loading: loadingAboutSection } = useQuery(
    FETCH_HOME_SECTION,
    {
      variables: { sectionName: "ABOUT" }
    }
  );

  useEffect(() => {
    if (dataAboutSection) {
      setIsAbout(dataAboutSection.homeCMS);
    }
  }, [dataAboutSection]);

  return (
    <Section2Styled visible width="90%" alt={isAbout.alt ? true : false}>
      <div className="switch">
        {loadingAboutSection ? (
          <p>Loading...</p>
        ) : (
          <EditModal aboutBool={dataAboutSection.homeCMS.alt} />
        )}
      </div>

      <div className="sec2-container">
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
            </div>
          </div>
          <div className="sec2-images">
            <div className="sec2-images_inner">
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

export default SectionAbout;
