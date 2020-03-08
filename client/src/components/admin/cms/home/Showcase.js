import React, { useState, useEffect, useCallback } from "react";
import gql from "graphql-tag";
import { useDropzone } from "react-dropzone";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FETCH_SHOWCASE } from "../../../../util/graphql/cms";
import { DShowCase, Overlay, DSection } from "../../../styled/containers";
import { DButton } from "../../../styled/utils";
import { Carousel } from "react-responsive-carousel";
import ShowcaseModal from "./ShowcaseModal";
import { Edit } from "@styled-icons/boxicons-regular/Edit";

const Showcase = () => {
  const [open, setOpen] = useState(false);
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

  const handleEdit = cms => {
    console.log(cms._id);
  };

  return (
    <DSection>
      <h1>Showcase</h1>
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
      <DSection>
        {!showcaseData ? (
          <h3>Loading...</h3>
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
                key={cms._id}
                height="50vh"
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
                    <h3>Z Essence Facial & Spa</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam, doloribus.
                    </p>
                  </div>
                  <Edit
                    size="32px"
                    onClick={cms => handleEdit(cms)}
                    style={{
                      position: "absolute",
                      right: "24px",
                      top: "10px",
                      color: "white",
                      cursor: "pointer"
                    }}
                  >
                    Edit
                  </Edit>
                </Overlay>

                <ShowcaseModal open={open} setOpen={setOpen} showcase={cms} />
              </DShowCase>
            ))}
          </Carousel>
        )}
      </DSection>
    </DSection>
  );
};

const NEW_SHOWCASE = gql`
  mutation addShowcase($file: Upload) {
    addShowcase(file: $file)
  }
`;

export default Showcase;
