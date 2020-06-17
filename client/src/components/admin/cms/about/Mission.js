import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ABOUT_CMS } from "../../../../util/graphql/cms";
import { DSection, Content, DImage } from "../../../styled/containers";
import ModalMissionVision from "./ModalMissionVision";

import Spinner from "../../../Spinner";
import useWindowSize from "../../../../util/hooks/useWindowSize";

const Story = () => {
  const { width } = useWindowSize();
  const [isMission, setIsMission] = useState({});

  const { data: dataMissionVision, loading: loadMissionVision } = useQuery(
    FETCH_ABOUT_CMS,
    {
      variables: {
        contentName: "ABOUTUS",
      },
    }
  );

  useEffect(() => {
    if (dataMissionVision) {
      setIsMission(dataMissionVision.aboutUsCMS.missionvision);
    }
  }, [dataMissionVision]);

  return (
    <>
      {loadMissionVision ? (
        <DSection
          width="90%"
          flex
          justify="space-around"
          align="center"
          mcenter
        >
          <Spinner />
        </DSection>
      ) : (
        <DSection
          height="100%"
          width="90%"
          flex
          justify="space-around"
          align="center"
          direct={
            width === 768
              ? "column"
              : isMission.alt === true
              ? "row-reverse"
              : "row"
          }
          margin="24px auto"
        >
          <ModalMissionVision
            isMissionVision={dataMissionVision.aboutUsCMS.missionvision}
          />
          <Content
            flex
            justify="flex-start"
            align="center"
            width="100%"
            height="100%"
            direct="column"
            pad="24px"
          >
            <h3>{isMission.mission && isMission.mission.title}</h3>
            {isMission.mission && isMission.mission.subtitle !== "" && (
              <h4>{isMission.mission.subtitle}</h4>
            )}
            <p>{isMission.mission && isMission.mission.paragraph}</p>
            <h3>{isMission.vision && isMission.vision.title}</h3>
            {isMission.vision && isMission.vision.subtitle !== "" && (
              <h4>{isMission.vision.subtitle}</h4>
            )}
            <p>{isMission.vision && isMission.vision.paragraph}</p>
          </Content>
          <Content
            flex
            justify="flex-start"
            align="center"
            direct="column"
            width="100%"
            height="100%"
            margin="0 auto"
            pad="24px"
          >
            <DImage height="100%">
              <img
                src={
                  isMission.imageURL
                    ? isMission.imageURL
                    : "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                }
                alt="about"
              />
            </DImage>
          </Content>
        </DSection>
      )}
      s
    </>
  );
};

export default Story;
