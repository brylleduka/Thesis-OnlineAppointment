import React, { useState, useEffect, useCallback } from "react";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FETCH_SHOWCASE } from "../../../../../util/graphql/cms";
import {
  DShowCase,
  Overlay,
  DSection,
  DContainer
} from "../../../../styled/containers";
import { DButton } from "../../../../styled/utils";
import ShowcaseModal from "./ShowcaseModal";
import DeleteShowcase from "./DeleteShowcase";
import NewSlide from "./NewSlide";
import { Icon } from "semantic-ui-react";
import Slider from "react-slick";

const Showcase = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const mql = window.matchMedia("(max-width: 768px)");
  const [showcase, setShowcase] = useState([]);
  const [isShowCase, setIsShowCase] = useState({});
  const [isDeleteShowCase, setIsDeleteShowCase] = useState({});

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

  const handleEdit = e => {
    e.preventDefault();
    setOpenEdit(true);
    setIsShowCase(e.currentTarget.dataset.scvalueedit);
  };

  const handleDelete = e => {
    e.preventDefault();
    setOpenAlert(true);
    setIsDeleteShowCase(e.currentTarget.dataset.scvalue);
  };

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
        <DShowCase
          height="50vh"
          background={
            "https://images.pexels.com/photos/3765134/pexels-photo-3765134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        ></DShowCase>
      ) : (
        <Slider {...settings}>
          {showcase.map(sc => (
            <DShowCase
              height="50vh"
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
                  <h3>Z Essence Facial & Spa</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, doloribus.
                  </p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 20,
                    display: "flex"
                  }}
                >
                  <DButton
                    value={sc._id}
                    data-scvalueedit={sc._id}
                    onClick={handleEdit}
                  >
                    <Icon name="edit" />
                  </DButton>
                  <DButton
                    alert
                    value={sc._id}
                    data-scvalue={sc._id}
                    onClick={handleDelete}
                  >
                    <Icon name="trash" />
                  </DButton>
                </div>
              </Overlay>
            </DShowCase>
          ))}
        </Slider>
      )}

      {isShowCase && (
        <ShowcaseModal
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          showcase={isShowCase}
        />
      )}

      {isDeleteShowCase && (
        <DeleteShowcase
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          isDeleteShowCase={isDeleteShowCase}
        />
      )}
    </DSection>
  );
};

export default Showcase;
