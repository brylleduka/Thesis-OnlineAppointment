import React, { useState, useEffect, useCallback } from "react";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FETCH_SHOWCASE } from "../../../../util/graphql/cms";
import {
  DShowCase,
  Overlay,
  DSection,
  DContainer
} from "../../../styled/containers";
import { DButton } from "../../../styled/utils";
import ShowcaseModal from "./ShowcaseModal";
import DeleteShowcase from "./DeleteShowcase";
import { Edit } from "@styled-icons/boxicons-regular/Edit";
import { Icon } from "semantic-ui-react";
import Slider from "react-slick";

const Showcase = () => {
  const [open, setOpen] = useState(false);
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

  // DROPZONE
  const [addShowcase, { loading }] = useMutation(NEW_SHOWCASE, {
    refetchQueries: [
      {
        query: FETCH_SHOWCASE,
        variables: {
          section: "SHOWCASE"
        }
      }
    ]
  });

  const onDrop = useCallback(
    ([file]) => {
      addShowcase({ variables: { file } });
    },
    [addShowcase]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleEdit = e => {
    e.preventDefault();
    setOpen(true);
    setIsShowCase(e.target.value);
  };

  const handleDelete = e => {
    e.preventDefault();
    setOpenAlert(true);
    setIsDeleteShowCase(e.currentTarget.dataset.scvalue);
    console.log(e.currentTarget.dataset.scvalue);
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
    <DSection width="900px" mcenter pad="20px 10px">
      <div
        style={{ border: "1px dashed #ccc", width: "100%", height: "150px" }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <h3>Drop Image</h3>
        ) : loading ? (
          <h2>Loading</h2>
        ) : (
          " Image Drop here"
        )}
      </div>
      {dataLoading ? (
        <DShowCase
          height="50vh"
          background={
            "https://images.pexels.com/photos/3765134/pexels-photo-3765134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          }
        ></DShowCase>
      ) : (
        <Slider {...settings}>
          {showcaseData &&
            showcaseData.contentManagements.map(sc => (
              <DShowCase
                height="50vh"
                width="600px"
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
                      onClick={handleEdit}
                      style={{ width: "50px" }}
                    >
                      <Icon name="edit" />
                      <div style={{ visibility: "hidden" }}>{sc._id}</div>
                    </DButton>
                    <DButton
                      alert
                      value={sc._id}
                      data-scvalue={sc._id}
                      onClick={handleDelete}
                      style={{ width: "50px" }}
                    >
                      <Icon name="trash" />
                      <div style={{ visibility: "hidden" }}>{sc._id}</div>
                    </DButton>
                  </div>
                </Overlay>
              </DShowCase>
            ))}
        </Slider>
      )}

      {isShowCase && (
        <ShowcaseModal open={open} setOpen={setOpen} showcase={isShowCase} />
      )}

      {isDeleteShowCase && (
        <DeleteShowcase
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          isDeleteShowCase={isDeleteShowCase}
        />
      )}
    </DSection>

    // <DSection height="100%" width="100%">
    //   <h1>Showcase</h1>
    //   <div
    //     style={{ border: "1px dashed #ccc", width: "100%", height: "150px" }}
    //     {...getRootProps()}
    //   >
    //     <input {...getInputProps()} />
    //     {isDragActive ? (
    //       <h3>Drop Image</h3>
    //     ) : loading ? (
    //       <h2>Loading</h2>
    //     ) : (
    //       " Image Drop here"
    //     )}
    //   </div>
    //   <DSection height="100%" width="100%">
    //     {dataLoading ? (
    //       <h3>Loading...</h3>
    //     ) : (
    //       <Slider {...settings}>
    //         {showcase.map(cms => (
    //           <DShowCase
    //             key={cms._id}
    //             height="90vh"
    //             background={
    //               cms.photo !== null || cms.photo !== undefined
    //                 ? `/images/cms/home/${cms.photo}`
    //                 : "https://images.pexels.com/photos/3765134/pexels-photo-3765134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    //             }
    //           >
    //             <Overlay
    //               bg={
    //                 "linear-gradient(to right, rgba(0,0,0,0.7), rgba(255,255,255,0.1))"
    //               }
    //               flex
    //               justify="flex-start"
    //               align="center"
    //             >
    //               <div className="overlay-content">
    //                 <h3>Z Essence Facial & Spa</h3>
    //                 <p>
    //                   Lorem ipsum dolor sit amet consectetur adipisicing elit.
    //                   Quisquam, doloribus.
    //                 </p>
    //               </div>
    //               <div
    //                 style={{
    //                   position: "absolute",
    //                   top: 0,
    //                   right: 20,
    //                   display: "flex"
    //                 }}
    //               >
    //                 <DButton
    //                   value={cms._id}
    //                   onClick={handleEdit}
    //                   style={{ width: "50px" }}
    //                 >
    //                   <Icon name="edit" />
    //                   <div style={{ visibility: "hidden" }}>{cms._id}</div>
    //                 </DButton>
    //                 <DButton
    //                   alert
    //                   value={cms._id}
    //                   onClick={handleDelete}
    //                   style={{ width: "50px" }}
    //                 >
    //                   <Icon name="trash" />
    //                   <div style={{ visibility: "hidden" }}>{cms._id}</div>
    //                 </DButton>
    //               </div>
    //             </Overlay>
    //           </DShowCase>
    //         ))}
    //       </Slider>
    //     )}
    //   </DSection>
    //   {isShowCase && (
    //     <ShowcaseModal open={open} setOpen={setOpen} showcase={isShowCase} />
    //   )}

    //   {isDeleteShowCase && (
    //     <DeleteShowcase
    //       openAlert={openAlert}
    //       setOpenAlert={setOpenAlert}
    //       isDeleteShowCase={isDeleteShowCase}
    //     />
    //   )}
    // </DSection>
  );
};

const NEW_SHOWCASE = gql`
  mutation addShowcase($file: Upload) {
    addShowcase(file: $file)
  }
`;

export default Showcase;
